import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShuyaiComponent } from "./components/shuyai/";
import { ConfirmarModule } from "./components/confirm-dialog/confirm-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConfirmarModule
   
  ],
  declarations: [ShuyaiComponent,],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ConfirmarModule,

    ShuyaiComponent,
  ]
})
export class SharedModule {}
