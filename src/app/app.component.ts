import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   menuMode = 'static';

   topbarMenuActive: boolean;

   overlayMenuActive: boolean;

   staticMenuDesktopInactive: boolean;

   staticMenuMobileActive: boolean;

   layoutMenuScroller: HTMLDivElement;

   lightMenu = true;

   lightTopbar = true;

   topbarColor = 'layout-topbar-bluegrey';

   menuClick: boolean;

   topbarItemClick: boolean;

   resetMenu: boolean;

   menuHoverActive: boolean;

   onLayoutClick() {
       if (!this.topbarItemClick) {
           this.topbarMenuActive = false;
       }

       if (!this.menuClick) {
           if (this.isHorizontal() || this.isSlim()) {
               this.resetMenu = true;
           }

           if (this.overlayMenuActive || this.staticMenuMobileActive) {
               this.hideOverlayMenu();
           }

           this.menuHoverActive = false;
       }

       this.topbarItemClick = false;
       this.menuClick = false;
   }

 
   onMenuClick($event) {
       this.menuClick = true;
       this.resetMenu = false;
   }

   onTopbarMenuButtonClick(event) {
       this.topbarItemClick = true;
       this.topbarMenuActive = !this.topbarMenuActive;

       this.hideOverlayMenu();

       event.preventDefault();
   }

   onTopbarSubItemClick(event) {
       event.preventDefault();
   }

   isHorizontal() {
       return this.menuMode === 'horizontal';
   }

   isSlim() {
       return this.menuMode === 'slim';
   }

   isOverlay() {
       return this.menuMode === 'overlay';
   }

   isStatic() {
       return this.menuMode === 'static';
   }

   isMobile() {
       return window.innerWidth < 1025;
   }

   isDesktop() {
       return window.innerWidth > 1024;
   }

   isTablet() {
       const width = window.innerWidth;
       return width <= 1024 && width > 640;
   }

   hideOverlayMenu() {
       this.overlayMenuActive = false;
       this.staticMenuMobileActive = false;
   }

   changeMenuMode(menuMode: string) {
       this.menuMode = menuMode;
       this.staticMenuDesktopInactive = false;
       this.overlayMenuActive = false;
   }
}
