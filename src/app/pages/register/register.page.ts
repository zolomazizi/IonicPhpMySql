import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController,LoadingController } from '@ionic/angular';
import { HAMMER_LOADER } from '@angular/platform-browser'; 
import { AccessProvidersService } from '../../providres/access-providers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name :string ="" ;
  lastname :string ="" ;
  date :string ="" ;
  email :string ="" ;
  Paswword :string ="" ;
  confirmepassword :string ="" ;

  disabledbutton;
  constructor(
    private router: Router,
    private Toastctr :ToastController ,
    private AlertCtr : AlertController ,
    private LoadingCtr : LoadingController ,
    private AccessPrv : AccessProvidersService 

    ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.disabledbutton = false ;
  }
  async singUpUser(){
    if(this.name == ''){
      this.presentToast('enter votre prenome svp'); 
    }else if (this.lastname == ''){
      this.presentToast('enter votre nome svp');
    }else if (this.date == ''){
      this.presentToast('enter vote date de naiss svp');
    }else if(this.email == ''){
      this.presentToast('enter votre email svp');
    }else if (this.Paswword == ''){
      this.presentToast('enter le mdp svp');
    }else if(this.Paswword != this.confirmepassword){
      this.presentToast('password not correcte');
    }else{
      this.disabledbutton = true ;
      const loading = await this.LoadingCtr.create({
        message: 'attede une minut...'
      });
      await loading.present();

      return new Promise(resolve => {
        let body ={
          action: 'registration_progress',
          name : this.name,
          lastname : this.lastname,
          date : this.date,
          email: this.email,
          password : this.Paswword
        }
        this.AccessPrv.postData(body, 'api.php').subscribe((res :any)=>{
          if(res.succes == true) {
            loading.dismiss();
            this.disabledbutton = false ; 
            this.presentToast(res.msg) ; 
            this.router.navigate(['/login']);
          }else{
            loading.dismiss();
            this.disabledbutton = false ; 
            this.presentToast(res.msg);
          }
        },(err) =>{
          loading.dismiss();
          this.disabledbutton = false ; 
          this.presentAlertConfirm('Timeout');

        });
      });
    }
  }

  async presentToast(a){
    const toast = await this.Toastctr.create({
      message: a,
      duration: 1500
    });
    toast.present();
    
  }

  async presentAlertConfirm(a){
    const alert =await this.AlertCtr.create({
      header: a ,
      backdropDismiss : false , 
      buttons : [
        {
          text: 'good',
          handler:(blah) =>{
            console.log('confirm cancel: blah');
          }
        },{
          text: 'coba lagi',
          handler:()=>{
            this.singUpUser();
          }
        }
      ]


    });
    await alert.present();
  }
}
