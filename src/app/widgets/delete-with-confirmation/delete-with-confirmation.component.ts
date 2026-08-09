import { Component, EventEmitter, OnDestroy, Output, output, signal } from '@angular/core';

@Component({
  selector: 'delete-with-confirmation',
  templateUrl: './delete-with-confirmation.component.html',
  styleUrl: './delete-with-confirmation.component.scss'
})
export class DeleteWithConfirmationComponent implements OnDestroy {
    @Output()
    onDelete = new EventEmitter<void>();

  deleteUnlocked = signal(false);

  private unlockTimeout: ReturnType<typeof setTimeout> | undefined;

  unlockDelete(seconds: number): void {
    if (seconds <= 0) {
      this.deleteUnlocked.set(false);
      return;
    }

    if (this.unlockTimeout !== undefined) {
      clearTimeout(this.unlockTimeout);
    }

    this.deleteUnlocked.set(true);
    this.unlockTimeout = setTimeout(() => {
      this.deleteUnlocked.set(false);
      this.unlockTimeout = undefined;
    }, seconds * 1000);
  }

  ngOnDestroy(): void {
    if (this.unlockTimeout !== undefined) {
      clearTimeout(this.unlockTimeout);
    }
  }

  confirmDelete() {
    this.onDelete.emit();
    this.deleteUnlocked.set(false);
    this.unlockTimeout = undefined;
  }
}
