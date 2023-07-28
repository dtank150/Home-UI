import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { IProperty } from 'src/app/model/Iproperty';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  property = new Property();
  // public mainPhotoUrl: string = null;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HousingService
  ) {}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe((data: any) => {
      this.property = data.prp as Property;
      // console.log(this.property.photos);
    });
    // this.property.age = this.service.getPropertyAge(this.property.estPossessionOn);
    if (this.property.estPossessionOn) {
      const estPossessionDate = new Date(this.property.estPossessionOn);
      this.property.age = this.service.getPropertyAge(estPossessionDate);
    } else {
      // Handle the case where estPossessionOn is undefined or null
      // For example, you can set a default age value or display an error message.
      this.property.age = "Unknown";
      console.log(this.property.photo);
    }


    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/Images/1.jpg',
        medium: 'assets/Images/1.jpg',
        big: 'assets/Images/1.jpg'
      },
      {
        small: 'assets/Images/2.jpg',
        medium: 'assets/Images/2.jpg',
        big: 'assets/Images/2.jpg'
      },
      {
        small: 'assets/Images/3.jpg',
        medium: 'assets/Images/3.jpg',
        big: 'assets/Images/3.jpg'
      },
      {
        small: 'assets/Images/4.jpg',
        medium: 'assets/Images/4.jpg',
        big: 'assets/Images/4.jpg'
      },
      {
        small: 'assets/Images/5.jpg',
        medium: 'assets/Images/5.jpg',
        big: 'assets/Images/5.jpg'
      },
      {
        small: 'assets/Images/6.jpg',
        medium: 'assets/Images/6.jpg',
        big: 'assets/Images/6.jpg'
      }

    ];

  }
  // changePrimaryPhoto(mainPhotoUrl: string){
  //   this.mainPhotoUrl = mainPhotoUrl;
  // }
//   getPeopertyPhotos():NgxGalleryImage[]{
//     const  photosUrl: NgxGalleryImage[] = [];
//     for(const photo of this.property.photos)
//     {
//        if(photo.isPrimary){
//            this.mainPhotoUrl = photo.imageUrl;
//        }
//        else{
//         photosUrl.push({
//           small:photo.imageUrl,
//           medium:photo.imageUrl,
//           big:photo.imageUrl
//         });
//        }
//     }
//     return photosUrl;
//   }
}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observer } from 'rxjs';
// import { IProperty } from 'src/app/model/Iproperty';
// import { Property } from 'src/app/model/property';
// import { HousingService } from 'src/app/service/housing.service';

// @Component({
//   selector: 'app-property-detail',
//   templateUrl: './property-detail.component.html',
//   styleUrls: ['./property-detail.component.css']
// })
// export class PropertyDetailComponent implements OnInit {

//   public propertyId!: number;
//   property = new Property();

//   constructor(private route:ActivatedRoute, private router:Router, private service:HousingService) { }

//   ngOnInit() {
//     this.propertyId = +this.route.snapshot.params['id'];
//     this.route.data.subscribe(
//         (data: Property) => {
//             this.property = data['prp'];
//             // console.log(this.property.photos);
//         }
//     );

//     // this.route.data.subscribe((data:Property)=>{
//     //   this.property = data['prp'];
//     // });
//     // this.route.params.subscribe((params) => {
//     //   this.propertyId = +params['id'];
//     //   // this.service.getProperty(this.propertyId).subscribe(
//     //   //   (data:Property) =>{
//     //   //     this.property.data;
//     //   //   }
//     //   // );
//     //   this.service.getProperty(this.propertyId).subscribe(
//     //     (data: Property | undefined) => {
//     //       if (data) {
//     //         this.property = data as Property; // Type assertion/conversion
//     //       }
//     //     },error => this.router.navigate(['/'])
//     //   );



//     // });
//   }
//   // onSelectNext(){
//   //   this.propertyId +=1;
//   //   this.router.navigate(['property-detail',this.propertyId]);

//   // }

// }
