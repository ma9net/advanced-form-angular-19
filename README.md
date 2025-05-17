# 🧩 Angular Advanced Forms Project

A fully featured Angular project demonstrating advanced use of Reactive Forms, custom form controls, dynamic form generation, and Angular capabilities including guards, services, directives, and pipes — enhanced with Angular Material.

---

## 🚀 Features

✅ Reactive and Template-Driven Forms  
✅ Dynamic Form Rendering from JSON  
✅ Angular Material Integration  
✅ Custom Form Controls (e.g., multiselect dropdowns, autocomplete)  
✅ Guards (AuthGuard, RoleGuard, UnsavedChangesGuard)  
✅ Pipes (CapitalizePipe, SafeHtmlPipe, FormStatusPipe)  
✅ Custom Directives (AutoFocus, Highlight, Permission-based display)  
✅ Modular Folder Structure  
✅ Lazy Loading & Routing  
✅ Reusable Shared UI Components  
✅ Type-safe Services and API Integration  
✅ Accessibility and Form Validations  
✅ Form Wizards with Stepper

---

## 🏗 Project Structure

src/
├── app/
│ ├── core/ → singleton services, guards, interceptors
│ ├── shared/ → reusable components, directives, pipes
│ ├── features/ → feature-specific modules (forms, auth, etc.)
│ ├── layouts/ → app layout wrappers (main, auth, footer, header)
│ ├── app-routing.module.ts
│ └── app.module.ts
├── assets/
├── environments/
└── main.ts


---

## 🛠️ Technologies Used

- **Angular 19+**
- **Angular Material**
- **Reactive Forms Module**
- **RxJS**
- **TypeScript**
- **SCSS**
- Optional (Coming Soon): NgRx, Firebase, i18n

---

## 🔐 Authentication & Guards

- `AuthGuard`: Protects authenticated routes  
- `RoleGuard`: Restricts access by role (admin, user, etc.)  
- `UnsavedChangesGuard`: Warns users if they try to navigate away with unsaved form data

---

## 🧰 Custom Services

- `AuthService` – handles login/logout and token logic  
- `FormService` – dynamic form config loading & management  
- `UserService` – user CRUD logic  
- `NotificationService` – centralized message/snackbar handling

---

## 🧩 Custom Directives

| Directive | Purpose |
|----------|---------|
| `AutoFocusDirective` | Auto-focus inputs on load |
| `HighlightDirective` | Highlights fields with errors |
| `PermissionDirective` | Conditionally show content by user role |

---

## 🔧 Pipes

| Pipe | Use Case |
|------|----------|
| `CapitalizePipe` | Capitalize each word in a string |
| `SafeHtmlPipe` | Render safe HTML content |
| `FormStatusPipe` | Display readable form control status |

---

## 📦 Installation

```bash
git clone [text](https://github.com/ma9net/advanced-form-angular-19)
cd advanced-form-angular-19
npm install
ng serve


💡 Scripts

ng serve	    Run dev server
ng build	    Build for production
ng test	        Run unit tests
ng lint	        Lint code
ng generate	    Generate components, services, etc.

📈 Roadmap
 Setup Angular Material

 Add route guards

 Add reusable shared components

 Implement dynamic form rendering

 Add form serialization (save/load form state)

 Add backend integration for saving form data

Form validation tests

Route guard and role-based access tests

Integration tests with TestBed

screenshots:
![Screenshot 2025-05-17 at 20-06-21 Template-Driven Forms](https://github.com/user-attachments/assets/00632718-6186-4865-97be-3c18e798f233)
![Screenshot 2025-05-17 at 20-06-52 Reactive Forms](https://github.com/user-attachments/assets/b5ddbb68-9c18-40f0-bca1-73796b405d15)


🤝 Contributions
Feel free to fork the project and submit PRs. For ideas or bugs, please create an issue.

👨‍💻 Author
ma9net
