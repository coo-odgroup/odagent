import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Signup } from '../model/signup';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../constant/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public signupRecord: Signup;
  public activeFaqTab: string = 'general';
  public activeFaqQuestion: number | null = 0;
  // STATS SLIDER
  public currentStatIndex: number = 0;
  public visibleStats: number = 5;

  private statsInterval: any;

  public totalStats: number = 9;
  public statsPage: number = 0;
  public totalStatsPages: number = 5;

  // =========================================================
  // EARNING CALCULATOR
  // =========================================================

  public bookingsPerDay: number = 8;

  // Average operator fare
  public operatorFare: number = 500;

  // ODBUS commission slab for ₹500 fare
  public odbusCommissionRate: number = 0.08;

  public sliderProgress: number = 24.14;

  public sliderBackground: string =
    'linear-gradient(to right, #009ce0 0%, #009ce0 24.14%, #dbeef7 24.14%, #dbeef7 100%)';

  // Agent gets 50% of ODBUS commission
  public agentCommissionShare: number = 0.50;

  // Counter service charge per booking
  public serviceChargePerBooking: number = 25;

  // Monthly calculation
  public monthlyBookings: number = 240;

  public odbusCommission: number = 40;
  public agentCommission: number = 20;
  public monthlyCommission: number = 4800;

  public monthlyServiceCharge: number = 6000;
  public monthlyBonus: number = 1800;

  public dailyEarning: number = 45;
  public monthlyEarning: number = 12600;

  // Current bonus milestone
  public currentBonusTier: number = 200;

  // Next bonus milestone
  public nextBonusTier: number = 350;

  public nextBonusAmount: number = 3500;

  // Bonus milestones
  public bonusMilestones = [
    { bookings: 25, bonus: 200 },
    { bookings: 50, bonus: 450 },
    { bookings: 100, bonus: 800 },
    { bookings: 200, bonus: 1800 },
    { bookings: 350, bonus: 3500 },
    { bookings: 500, bonus: 5500 }
  ];

  constructor(public router: Router, protected fb: FormBuilder, private signupService: SignupService, private notificationService: NotificationService, private notify: NotificationService) { }


  ngOnInit() {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    });

    // Set visible stats according to screen size
    this.updateVisibleStats();

    // Start stats slider
    this.startStatsSlider();

    // Start earning calculator
    this.calculateEarnings();
  }

  // =========================================================
  // STATS SLIDER
  // =========================================================

  startStatsSlider(): void {

    // Clear existing interval first
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }

    // Slide every 3 seconds
    this.statsInterval = setInterval(() => {

      const maxIndex = this.totalStats - this.visibleStats;

      if (this.currentStatIndex < maxIndex) {

        this.currentStatIndex++;
        this.updateStatsPage();

      } else {

        // Start again from first stat
        this.currentStatIndex = 0;
        this.statsPage = 0;


      }

    }, 3000);
  }

  updateStatsPage(): void {

    const maxIndex = this.totalStats - this.visibleStats;

    if (maxIndex <= 0) {
      this.statsPage = 0;
      return;
    }

    this.statsPage = Math.round(
      (this.currentStatIndex / maxIndex) * 4
    );

  }


  // =========================================================
  // RESPONSIVE VISIBLE STATS
  // =========================================================

  updateVisibleStats(): void {

    const width = window.innerWidth;

    if (width <= 767) {

      // Mobile = 2 stats
      this.visibleStats = 2;

    } else if (width <= 1023) {

      // Tablet = 4 stats
      this.visibleStats = 4;

    } else {

      // Desktop = 5 stats
      this.visibleStats = 5;
    }


    // Make sure index never goes outside the range

    const maxIndex = this.totalStats - this.visibleStats;

    if (this.currentStatIndex > maxIndex) {
      this.currentStatIndex = 0;
    }
    this.updateStatsPage();
  }



  // =========================================================
  // EARNING CALCULATION
  // =========================================================

  calculateEarnings(): void {

    // -------------------------------------------------------
    // 1. Get bookings per day
    // -------------------------------------------------------

    const bookings = Number(this.bookingsPerDay) || 0;

    this.bookingsPerDay = bookings;

    this.sliderProgress = ((bookings - 1) / (30 - 1)) * 100;

    this.sliderBackground =
      'linear-gradient(to right, #009ce0 0%, #009ce0 ' +
      this.sliderProgress +
      '%, #dbeef7 ' +
      this.sliderProgress +
      '%, #dbeef7 100%)';


    // -------------------------------------------------------
    // 2. Monthly bookings / PNRs
    // -------------------------------------------------------

    this.monthlyBookings = bookings * 30;


    // -------------------------------------------------------
    // 3. ODBUS commission per seat
    // -------------------------------------------------------

    this.odbusCommission =
      this.operatorFare * this.odbusCommissionRate;


    // -------------------------------------------------------
    // 4. Agent commission = 50% of ODBUS commission
    // -------------------------------------------------------

    this.agentCommission =
      this.odbusCommission * this.agentCommissionShare;


    // -------------------------------------------------------
    // 5. Monthly agent commission
    // -------------------------------------------------------

    this.monthlyCommission =
      this.monthlyBookings * this.agentCommission;


    // -------------------------------------------------------
    // 6. Monthly service charge
    // -------------------------------------------------------

    this.monthlyServiceCharge =
      this.monthlyBookings * this.serviceChargePerBooking;


    // -------------------------------------------------------
    // 7. Find highest bonus tier reached
    // -------------------------------------------------------

    this.monthlyBonus = 0;

    this.currentBonusTier = 0;

    this.nextBonusTier = 0;

    this.nextBonusAmount = 0;


    for (let i = 0; i < this.bonusMilestones.length; i++) {

      const milestone = this.bonusMilestones[i];

      if (this.monthlyBookings >= milestone.bookings) {

        // Highest achieved tier
        this.monthlyBonus = milestone.bonus;
        this.currentBonusTier = milestone.bookings;

      } else {

        // First upcoming tier
        this.nextBonusTier = milestone.bookings;
        this.nextBonusAmount = milestone.bonus;

        break;
      }
    }


    // -------------------------------------------------------
    // 8. Daily earning
    // -------------------------------------------------------

    this.dailyEarning =
      this.agentCommission + this.serviceChargePerBooking;


    // -------------------------------------------------------
    // 9. Monthly earning
    // -------------------------------------------------------

    this.monthlyEarning =
      this.monthlyCommission +
      this.monthlyServiceCharge +
      this.monthlyBonus;


    // -------------------------------------------------------
    // 10. Update HTML
    // -------------------------------------------------------

    this.updateCalculatorUI();
  }

  onBookingSliderChange(event: Event): void {

    const slider =
      event.target as HTMLInputElement;

    this.bookingsPerDay =
      Number(slider.value);

    this.calculateEarnings();

  }


  // =========================================================
  // UPDATE CALCULATOR UI
  // =========================================================

  updateCalculatorUI(): void {

    // Booking count
    const ticketCountLabel =
      document.getElementById('ticketCountLabel');

    if (ticketCountLabel) {
      ticketCountLabel.innerText =
        this.bookingsPerDay.toString();
    }


    // Monthly booking count
    const monthlyBookingCount =
      document.getElementById('monthlyBookingCount');

    if (monthlyBookingCount) {
      monthlyBookingCount.innerText =
        this.monthlyBookings.toString();
    }


    // ODBUS / Agent commission
    const baseCommVal =
      document.getElementById('baseCommVal');

    if (baseCommVal) {
      baseCommVal.innerText =
        this.formatCurrency(this.monthlyCommission);
    }


    // Service charge
    const addonCommVal =
      document.getElementById('addonCommVal');

    if (addonCommVal) {
      addonCommVal.innerText =
        '+' + this.formatCurrency(this.monthlyServiceCharge);
    }


    // Monthly bonus
    const monthlyBonusVal =
      document.getElementById('monthlyBonusVal');

    if (monthlyBonusVal) {
      monthlyBonusVal.innerText =
        '+' + this.formatCurrency(this.monthlyBonus);
    }


    // Daily earning
    const totalDailyProfit =
      document.getElementById('totalDailyProfit');

    if (totalDailyProfit) {
      totalDailyProfit.innerText =
        this.formatCurrency(this.dailyEarning);
    }


    // Monthly earning
    const monthlyProfit =
      document.getElementById('monthlyProfit');

    if (monthlyProfit) {
      monthlyProfit.innerText =
        this.formatCurrency(this.monthlyEarning);
    }


    // Bonus progress text
    this.updateBonusProgress();


    // Milestone highlight
    this.updateMilestoneHighlight();


    // Signboard message
    this.updateSignboardMessage();
  }

  // =========================================================
  // CURRENCY FORMAT
  // =========================================================

  formatCurrency(value: number): string {

    return '₹' + Math.round(value).toLocaleString('en-IN');

  }

  // =========================================================
  // BONUS PROGRESS MESSAGE
  // =========================================================

  updateBonusProgress(): void {

    const bonusProgressText =
      document.getElementById('bonusProgressText');

    if (!bonusProgressText) {
      return;
    }


    // If all milestones achieved
    if (this.nextBonusTier === 0) {

      bonusProgressText.innerText =
        'You have unlocked the maximum monthly bonus of ₹5,500';

      return;
    }


    const remaining =
      this.nextBonusTier - this.monthlyBookings;


    bonusProgressText.innerText =
      remaining +
      ' more bookings this month unlocks +' +
      this.formatCurrency(this.nextBonusAmount);

  }


  // =========================================================
  // MILESTONE HIGHLIGHT
  // =========================================================

  updateMilestoneHighlight(): void {

    const milestoneItems =
      document.querySelectorAll('.milestone-item');


    milestoneItems.forEach((item: Element, index: number) => {

      const milestone =
        this.bonusMilestones[index];

      if (!milestone) {
        return;
      }


      item.classList.remove('achieved');
      item.classList.remove('current');
      item.classList.remove('upcoming');


      if (this.monthlyBookings >= milestone.bookings) {

        item.classList.add('achieved');

      } else {

        item.classList.add('upcoming');

      }


      // Highest currently achieved tier
      if (
        this.currentBonusTier === milestone.bookings
      ) {

        item.classList.remove('achieved');
        item.classList.add('current');

      }

    });

  }

  // =========================================================
  // SIGNBOARD MESSAGE
  // =========================================================

  updateSignboardMessage(): void {

    const signboardMessage =
      document.getElementById('signboardMessage');

    if (!signboardMessage) {
      return;
    }


    if (this.monthlyBookings >= 150) {

      signboardMessage.style.display = 'flex';

      signboardMessage.innerHTML = `
        <span class="signboard-icon">★</span>
        <span>
          At this level you also qualify for a lit ODBUS signboard.
        </span>
      `;

    } else {

      signboardMessage.style.display = 'none';

    }

  }

  // Detect screen resize
  @HostListener('window:resize')
  onWindowResize(): void {

    this.updateVisibleStats();

  }


  // =========================================================
  // STOP SLIDER WHEN COMPONENT IS DESTROYED
  // =========================================================

  ngOnDestroy(): void {

    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }

  }
  ResetForm() {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    });
  }
  check_credentials() {
    const data = {
      phone: this.form.value.phone,
    };
    this.signupService.signup(data).subscribe(
      res => {

        if (res.status == 1) {
          this.signupRecord = res.data;
          //console.log(res.data);
          localStorage.setItem("USERRECORDS", JSON.stringify(this.signupRecord));
          localStorage.setItem("USERID", JSON.stringify(this.signupRecord.id));
          localStorage.setItem("PHONE", JSON.stringify(this.signupRecord.phone));
          this.router.navigate(['otp']);

        } else {
          this.notify.notify(res.message, "Error");
        }

      },
    );
  }

  // FAQ TAB
  switchFaqTab(tab: string): void {
    this.activeFaqTab = tab;
    this.activeFaqQuestion = 0;
  }

  // FAQ QUESTION
  toggleFaq(index: number): void {
    if (this.activeFaqQuestion === index) {
      this.activeFaqQuestion = null;
    } else {
      this.activeFaqQuestion = index;
    }
  }

  // CHECK ACTIVE TAB
  isFaqTabActive(tab: string): boolean {
    return this.activeFaqTab === tab;
  }

  // CHECK ACTIVE QUESTION
  isFaqQuestionActive(index: number): boolean {
    return this.activeFaqQuestion === index;
  }

}
