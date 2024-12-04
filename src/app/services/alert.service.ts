import { Injectable } from "@angular/core";
import { AlertConfirmComponent } from "@components/alert-confirm/alert-confirm.component";
import { AlertErrorComponent } from "@components/alert-error/alert-error.component";
import { AlertSuccessComponent } from "@components/alert-success/alert-success.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private modalService: BsModalService) { }

  async success(message: string): Promise<boolean> {
    const modalRef = this.modalService.show(AlertSuccessComponent, {
      initialState: { message },
    });
    return firstValueFrom(modalRef.content!.event);
  }

  async error(message: string): Promise<boolean> {
    const modalRef = this.modalService.show(AlertErrorComponent, {
      initialState: { message },
    });
    return firstValueFrom(modalRef.content!.event);
  }

  async confirm(message: string): Promise<boolean> {
    const modalRef = this.modalService.show(AlertConfirmComponent, {
      initialState: { message },
    });
    return firstValueFrom(modalRef.content!.event);
  }
}
