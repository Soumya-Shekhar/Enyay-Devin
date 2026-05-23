# Architecture Diagram

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│         AddUpdateInmateComponent (Parent)                       │
│  - Manages tab navigation                                       │
│  - Step indicator (1-7)                                         │
│  - Previous/Next/Submit buttons                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┬──────────────────┬──────────────┬──────────────┐
          │                │                │                  │              │              │
          ▼                ▼                ▼                  ▼              ▼              ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐      ┌─────────────┐ ┌──────────┐  ┌──────────┐
    │ Inmate   │    │  Audio   │    │  Video   │      │ Approval    │ │ Wallet & │  │Activate  │
    │ Details  │    │ Contact  │    │ Contact  │      │ Workflow    │ │Recharge  │  │ Calling  │
    └────┬─────┘    └────┬─────┘    └────┬─────┘      └──────┬──────┘ └────┬─────┘  └────┬─────┘
         │               │               │                   │             │            │
         └───────────────┼───────────────┼───────────────────┼─────────────┼────────────┘
                         │               │                   │             │
                         └───────────────┼───────────────────┼─────────────┴─────┐
                                         │                   │                   │
                                         ▼                   ▼                   ▼
                              ┌────────────────────────────────────────────────────────┐
                              │     InmateDataService (Shared Service)                 │
                              │  - Manages all component data via Signals              │
                              │  - Provides save methods for each component           │
                              │  - Centralized data access via getAllData()            │
                              └────────────────────────────────────────────────────────┘
                                                        ▲
                                                        │
                                         (providedIn: 'root')
```

## Data Flow Diagram

```
User Input in Component
         │
         ▼
Update Component Signal
(via two-way binding)
         │
         ▼
Component Save Button
         │
         ▼
Call Service.save[ComponentName]()
         │
         ▼
Log to console
(Ready for API integration)
         │
         ▼
Parent Submit Button
         │
         ▼
Call Service.getAllData()
         │
         ▼
Aggregate all component data
         │
         ▼
Send to backend API
```

## Tab Navigation Flow

```
Step 1: Inmate Details
    │
    ├─ Previous (Disabled)
    └─ Next → Step 2

Step 2: Audio Contact
    │
    ├─ Previous → Step 1
    └─ Next → Step 3

Step 3: Video Contact
    │
    ├─ Previous → Step 2
    └─ Next → Step 4

Step 4: Approval Workflow
    │
    ├─ Previous → Step 3
    └─ Next → Step 5

Step 5: Wallet & Recharge
    │
    ├─ Previous → Step 4
    └─ Next → Step 6

Step 6: Activate Calling
    │
    ├─ Previous → Step 5
    └─ Next → Step 7

Step 7: Deactivate Calling
    │
    ├─ Previous → Step 6
    └─ Submit All Details
```

## Component Features Matrix

| Component | Features | Save Button |
|-----------|----------|-------------|
| Inmate Details | Full Name, Gender, ID, Photo, Docs, Biometric | ✅ Save |
| Audio Contact | Contact Info, Relation, Phone, Validation, Biometric | ✅ Save |
| Video Contact | Contact Info, Relation, App ID, Docs, Biometric | ✅ Save |
| Approval Workflow | 2-Level Approval, Status, Remarks | ✅ Save |
| Wallet & Recharge | Balance, Amount, Quick Amounts | ✅ Save |
| Activate Calling | Audio Toggle, Video Toggle | ✅ Save |
| Deactivate Calling | Reason, Document, Remarks | ✅ Save |

## Signal-Based State Management

```
Service Signals:
├── inmateData ────────────────┐
├── audioContactData ──────────┼─→ [Signal Value]
├── videoContactData ──────────┤      │
├── approvalData ──────────────┼─→ getter: componentData()
├── walletData ────────────────┤      │
├── callingFeatureData ────────┼─→ Template Binding
└── deactivationData ──────────┤      │
                               └─→ [(ngModel)] = "componentData()"
                                    [Click] → updateSignal()
```

## Integration Points

```
┌─ Component 1 ─┐
│               │
│ Data Binding  │──────┐
│               │      │
└───────────────┘      │
                       │
┌─ Component 2 ─┐      │     ┌──────────────────┐
│               │      └────→│ InmateDataService│
│ Data Binding  │      ├────→│                  │
│               │      │     │ • Signals        │
└───────────────┘      │     │ • Save Methods   │
                       │     │ • Get All Data   │
┌─ Component N ─┐      │     └──────────────────┘
│               │      │
│ Data Binding  │──────┘
│               │
└───────────────┘
```

## Component Import Tree

```
AddUpdateInmateComponent
├── CommonModule
├── FormsModule
├── PRIME_NG_MODULES
├── InmateDetailsComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
├── AudioContactComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
├── VideoContactComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
├── ApprovalWorkflowComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
├── WalletRechargeComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
├── ActivateCallingComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
├── DeactivateCallingComponent
│   ├── CommonModule
│   ├── FormsModule
│   └── PRIME_NG_MODULES
└── InmateDataService
    └── (providedIn: 'root')
```

## Benefits Visualization

```
BEFORE: Monolithic Component
┌──────────────────────────────────┐
│  AddUpdateInmateComponent         │
│  ├─ 400+ lines (HTML)            │
│  ├─ 212 lines (TypeScript)       │
│  ├─ Complex logic                │
│  ├─ Hard to test                 │
│  └─ Difficult to maintain        │
└──────────────────────────────────┘

AFTER: Modular Architecture
┌──────────┬──────────┬───────────┬──────────────┬───────────┬─────────────┬──────────────┐
│ Inmate   │  Audio   │  Video    │ Approval     │ Wallet &  │ Activate    │ Deactivate   │
│ Details  │ Contact  │ Contact   │ Workflow     │ Recharge  │ Calling     │ Calling      │
│ ~60 LOC  │ ~60 LOC  │ ~60 LOC   │ ~80 LOC      │ ~60 LOC   │ ~40 LOC     │ ~50 LOC      │
│ ✅ Easy  │ ✅ Easy  │ ✅ Easy   │ ✅ Organized │ ✅ Simple │ ✅ Focused  │ ✅ Clear     │
│ ✅ Test  │ ✅ Test  │ ✅ Test   │ ✅ Maintain  │ ✅ Extend │ ✅ Reuse    │ ✅ Manage    │
└──────────┴──────────┴───────────┴──────────────┴───────────┴─────────────┴──────────────┘
```
