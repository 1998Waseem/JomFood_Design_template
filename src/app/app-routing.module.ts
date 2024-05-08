import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'productdetails',
    loadChildren: () => import('./pages/productdetails/productdetails.module').then( m => m.ProductdetailsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'ordertracking',
    loadChildren: () => import('./pages/ordertracking/ordertracking.module').then( m => m.OrdertrackingPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./pages/credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'addcredit',
    loadChildren: () => import('./pages/addcredit/addcredit.module').then( m => m.AddcreditPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'myaddress',
    loadChildren: () => import('./pages/myaddress/myaddress.module').then( m => m.MyaddressPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'addaddress',
    loadChildren: () => import('./pages/addaddress/addaddress.module').then( m => m.AddaddressPageModule)
  },
  {
    path: 'myreviews',
    loadChildren: () => import('./pages/myreviews/myreviews.module').then( m => m.MyreviewsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'termsconditions',
    loadChildren: () => import('./pages/termsconditions/termsconditions.module').then( m => m.TermsconditionsPageModule)
  },
  {
    path: 'refund',
    loadChildren: () => import('./pages/refund/refund.module').then( m => m.RefundPageModule)
  },
  {
    path: 'newsroom',
    loadChildren: () => import('./pages/newsroom/newsroom.module').then( m => m.NewsroomPageModule)
  },
  {
    path: 'termuse',
    loadChildren: () => import('./pages/termuse/termuse.module').then( m => m.TermusePageModule)
  },
  {
    path: 'searchcategory',
    loadChildren: () => import('./pages/searchcategory/searchcategory.module').then( m => m.SearchcategoryPageModule)
  },
  {
    path: 'paymentsucess',
    loadChildren: () => import('./pages/paymentsucess/paymentsucess.module').then( m => m.PaymentsucessPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
