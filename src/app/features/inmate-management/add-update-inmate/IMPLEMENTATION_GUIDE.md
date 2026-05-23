# Implementation Notes & Best Practices

## Component Creation Pattern

Each component follows this standardized pattern:

### Template (.html)
```html
<div class="section-card">
  <h3 class="section-title">
    <span class="section-number">X</span>
    Component Title
  </h3>
  
  <!-- Component-specific content -->
  
  <!-- Save Button -->
  <div class="component-footer">
    <p-button label="Save [ComponentName]" icon="pi pi-save" severity="success" (onClick)="save()" />
  </div>
</div>
```

### TypeScript (.ts)
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './component-name.html',
  styleUrls: ['./component-name.scss'],
})
export class ComponentNameComponent {
  constructor(public inmateService: InmateDataService) {}

  get dataPropertyName() {
    return this.inmateService.dataPropertyName;
  }

  save(): void {
    this.inmateService.saveComponentName();
  }
}
```

### Styling (.scss)
- Inherit common styles from `inmate-details.scss`
- Keep component-specific styles minimal
- Use CSS Grid for responsive layouts
- Follow BEM naming convention for clarity

## Data Binding Pattern

### Read Data
```typescript
// In template: use signal as function
{{ dataSignal().propertyName }}

// In component: getter method
get dataSignal() {
  return this.inmateService.dataSignal;
}
```

### Write Data (Two-way Binding)
```html
<input [(ngModel)]="dataSignal().propertyName" />
```

### Update Data Programmatically
```typescript
const currentData = this.inmateService.dataSignal();
this.inmateService.dataSignal.set({
  ...currentData,
  propertyToUpdate: newValue,
});
```

## Service Integration

### Adding a New Component Data

1. **Add Signal to Service**:
```typescript
newComponentData = signal({
  property1: '',
  property2: '',
});
```

2. **Add Save Method**:
```typescript
saveNewComponent(): void {
  console.log('Saving new component:', this.newComponentData());
}
```

3. **Add to getAllData**:
```typescript
getAllData() {
  return {
    // ... existing data
    newComponent: this.newComponentData(),
  };
}
```

## Common Issues & Solutions

### Issue 1: Import Path Errors
**Problem**: Cannot find module error
**Solution**: Check relative path depth. For components in subdirectories:
```typescript
// Wrong (too many ../)
import from '../../../../shared/primeng/primeng-imports';

// Correct (for files in subdirectories)
import from '../../../../../shared/primeng/primeng-imports';
```

### Issue 2: ngModel Not Working
**Problem**: Two-way binding doesn't update
**Solution**: 
- Ensure FormsModule is imported
- Ensure signal is called as function: `signal()`
- Check that property exists in signal object

### Issue 3: Signal Not Updating Template
**Problem**: Changes don't reflect in template
**Solution**:
- Always use `.set()` to update signal, not direct mutation
- Spread operator ensures Angular detects change: `{ ...current, prop: value }`

### Issue 4: Service Data Lost on Refresh
**Problem**: Data resets on page reload
**Solution**: Implement persistence layer (discussed in enhancements)

## Performance Optimization Tips

1. **Lazy Load Components**
```typescript
// In routing
path: 'add-inmate',
loadComponent: () => import('./add-update-inmate.component')
  .then(m => m.AddUpdateInmateComponent)
```

2. **Change Detection Strategy**
```typescript
@Component({
  // ... existing config
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

3. **Memoization for Getters**
```typescript
dataSignal = signal({ /* ... */ });
memoizedData = computed(() => this.inmateService.dataSignal());
```

## Testing Guidelines

### Unit Test Template
```typescript
describe('InmateDetailsComponent', () => {
  let component: InmateDetailsComponent;
  let fixture: ComponentFixture<InmateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmateDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InmateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save data', () => {
    spyOn(component.inmateService, 'saveInmateDetails');
    component.save();
    expect(component.inmateService.saveInmateDetails).toHaveBeenCalled();
  });
});
```

## Future Enhancements

### 1. Form Validation
```typescript
// Add validators to each component
validators = {
  inmateDetails: new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    // ...
  })
};
```

### 2. Data Persistence
```typescript
// Add localStorage integration
saveInmateDetails(): void {
  const data = this.inmateData();
  localStorage.setItem('inmate-details', JSON.stringify(data));
}

// Load from localStorage on init
loadInmateDetails(): void {
  const saved = localStorage.getItem('inmate-details');
  if (saved) {
    this.inmateData.set(JSON.parse(saved));
  }
}
```

### 3. API Integration
```typescript
// Inject HttpClient
constructor(
  public inmateService: InmateDataService,
  private http: HttpClient
) {}

// Save to backend
save(): void {
  this.http.post('/api/inmate/details', this.inmateService.inmateData())
    .subscribe(
      (response) => {
        console.log('Saved successfully', response);
      },
      (error) => {
        console.error('Save failed', error);
      }
    );
}
```

### 4. Progress Tracking
```typescript
// Add progress signal to service
completionPercentage = computed(() => {
  let completed = 0;
  // Count filled components
  return (completed / 7) * 100;
});
```

### 5. Undo/Redo Functionality
```typescript
// Maintain history of changes
private history: any[] = [];

saveState(): void {
  this.history.push({
    inmate: this.inmateData(),
    audio: this.audioContactData(),
    // ... all data
  });
}

undo(): void {
  if (this.history.length > 0) {
    const previous = this.history.pop();
    this.restoreState(previous);
  }
}
```

## Naming Conventions

### Signals
```typescript
componentNameData = signal({...})     // ✅ Preferred
componentName = signal({...})         // ❌ Avoid (too generic)
```

### Methods
```typescript
saveComponentName()         // ✅ Component save method
inmate.service.ts          // ✅ Service filename
audio-contact.component.ts // ✅ Component filename
```

### CSS Classes
```scss
.section-card         // Parent container
.component-footer     // Footer specific to component
.form-grid           // Layout grid
.form-field          // Individual form control
.required            // Requirement indicator
```

## Accessibility (A11y) Checklist

- [ ] All form inputs have `<label>` elements
- [ ] Required fields marked with `<span class="required">*</span>`
- [ ] Images have alt text
- [ ] Color not the only indicator (icons, text)
- [ ] Keyboard navigation works (Tab order)
- [ ] Screen reader friendly (semantic HTML)
- [ ] ARIA labels for complex components

## Security Considerations

1. **File Upload Security**
   - Validate file types on both client and server
   - Limit file size (currently 2-5MB)
   - Implement virus scanning on backend

2. **Data Validation**
   - Sanitize user input
   - Validate email/phone formats
   - Use DomSanitizer for HTML content

3. **API Communication**
   - Use HTTPS only
   - Implement CSRF protection
   - Add authentication/authorization checks
   - Implement rate limiting

## Deployment Checklist

- [ ] Remove console.log statements (use logger service)
- [ ] Update API endpoints for production
- [ ] Enable production build optimization
- [ ] Test all components in production build
- [ ] Verify file upload functionality
- [ ] Test on multiple browsers
- [ ] Check mobile responsiveness
- [ ] Verify accessibility compliance
- [ ] Implement error handling
- [ ] Add loading indicators
- [ ] Implement success/error notifications
