import { ChangeDetectionStrategy, Component, ContentChild, inject, TemplateRef } from '@angular/core';
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  loadingService = inject(LoaderService);

  @ContentChild('loaderTemplate') loaderTemplate?: TemplateRef<any>;
}
