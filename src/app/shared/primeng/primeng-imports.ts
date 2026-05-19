/**
 * Shared PrimeNG imports barrel file.
 * Import PRIME_NG_MODULES array in standalone component `imports` to use PrimeNG components.
 */

// Tabs
import { TabsModule } from 'primeng/tabs';

// Form controls
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

// Buttons
import { ButtonModule } from 'primeng/button';

// Data display
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';

// File upload
import { FileUploadModule } from 'primeng/fileupload';

// Feedback
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { StepperModule } from 'primeng/stepper';

// Layout
import { FluidModule } from 'primeng/fluid';

export const PRIME_NG_MODULES = [
  TabsModule,
  InputTextModule,
  TextareaModule,
  SelectModule,
  RadioButtonModule,
  ToggleSwitchModule,
  InputGroupModule,
  InputGroupAddonModule,
  ButtonModule,
  TableModule,
  TagModule,
  BadgeModule,
  CardModule,
  DividerModule,
  PanelModule,
  FileUploadModule,
  TooltipModule,
  MessageModule,
  StepperModule,
  FluidModule,
];
