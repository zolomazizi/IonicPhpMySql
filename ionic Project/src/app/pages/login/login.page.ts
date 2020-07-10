import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProvidersService } from '../../providres/access-providers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string= "";
  password : string= "";
  disabledbutton;


  constructor(
    
    private router: Router,
    private Toastctr :ToastController ,
    private AlertCtr : AlertController ,
    private LoadingCtr : LoadingController ,
    private AccessPrv : AccessProvidersService ,
    private navctrl : NavController,
    private Storage : Storage
  ) { }

  ngOnInit() {
  }

  goToSingUp(){
    this.router.navigate(['/register']);
  }

  ionViewDidEnter() {
    this.disabledbutton = false ;
  }

  async loginUser(){
    if(this.email == ''){
      this.presentToast('enter votre email svp'); 
    }else if (this.password == ''){
      this.presentToast('enter le mdp svp');
    }else{
      this.disabledbutton = true ;
      const loading = await this.LoadingCtr.create({
        message: 'attede une minut...'
      });
      await loading.present();

      return new Promise(resolve => {
        let body ={
          action: 'login_progress',
         
          email: this.email,
          password : this.password
        }
        this.AccessPrv.postData(body, 'api.php').subscribe((res :any)=>{
          if(res.succes == true) {
            loading.dismiss();
            this.disabledbutton = true ; 
            this.presentToast("login access") ; 
            
            this.Storage.set('storage_session' , res.result);
            this.navctrl.navigateRoot(['/home']);
          }else{
            loading.dismiss();
            this.disabledbutton = false ; 
            this.presentToast("email dosn't exixst or incorrect password");
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
          text: 'try again',
          handler:()=>{
            this.loginUser();
          }
        }
      ]


    });
    await alert.present();
  }
}
