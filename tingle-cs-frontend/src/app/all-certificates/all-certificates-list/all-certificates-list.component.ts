import { Component, OnInit, OnDestroy } from '@angular/core';
import { Certificate } from '../../shared/certificate.model';
import { CertificatesService } from '../certificates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-certificates-list',
  templateUrl: './all-certificates-list.component.html',
  styleUrls: ['./all-certificates-list.component.css']
})
export class AllCertificatesListComponent implements OnInit, OnDestroy {

  certificates: Certificate[];
  private subscription: Subscription;
  
  constructor(private certificateService: CertificatesService) { }

  ngOnInit(): void {
     this.subscription =  this.certificateService.getCertificates().subscribe((data: Certificate[]) => {
        this.certificates = data;
      })
  }

  onCertificateDetails(certificate: Certificate) {
    this.certificateService.getCertificate(certificate.serialNumber, certificate.certificateRole);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}