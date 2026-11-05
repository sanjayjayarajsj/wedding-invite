import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  private sanitizer = inject(DomSanitizer);

  opened = false;
  gone = false;
  playing = false;

  petals = Array.from({ length: 20 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 10,
    dur: 9 + Math.random() * 8, size: 10 + Math.random() * 12,
    color: ['#F3C9CF', '#D9788C', '#A9202F', '#FFF1E0'][i % 4]
  }));

  // ---- EDIT YOUR CONTENT HERE ----
  bride = { name: 'Nandana', parents: 'D/O Ravindran. C & Rajani. T', home: 'Chethott House, Payyavoor P.O., Ponnumparamba' };
  groom = { name: 'Rajeesh', parents: 'S/O Rameshan. P & Omanam. K', home: 'K.K. House, Muzhakkunnu P.O.' };
  date = { day: '03', month: 'December', year: '2026', weekday: 'Thursday', malayalam: '17th Vrischikam, 1202' };
  muhurtham = '11:00 AM – 11:40 AM';
  venue = 'NSS Auditorium';
  venuePlace = 'Payyavoor, Kannur';
  // Tip: for an exact pin, search the venue on Google Maps, copy the place name/address and put it in mapQuery
  mapQuery = 'NSS Auditorium Payyavoor';
  regards = 'Vinayak Ravindran and other relatives and friends';
  // --------------------------------

  mapEmbed: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://maps.google.com/maps?q=' + encodeURIComponent(this.mapQuery) + '&z=15&output=embed');
  directions = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(this.mapQuery);
  // 11:00 AM IST = 05:30 UTC
  calendar = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('Nandana & Rajeesh Wedding') + '&dates=20261203T053000Z/20261203T061000Z&location=' +
    encodeURIComponent(this.mapQuery);

  get daysLeft() {
    const d = Math.ceil((new Date('2026-12-03T11:00:00+05:30').getTime() - Date.now()) / 86400000);
    return d > 0 ? d : 0;
  }

  open() {
    this.opened = true;
    const a = this.audio.nativeElement;
    a.volume = 0.5;
    a.play().then(() => (this.playing = true)).catch(() => (this.playing = false));
    setTimeout(() => (this.gone = true), 1800);
  }

  toggleMusic() {
    const a = this.audio.nativeElement;
    if (a.paused) { a.play(); this.playing = true; } else { a.pause(); this.playing = false; }
  }
}