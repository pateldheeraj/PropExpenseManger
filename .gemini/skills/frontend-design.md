# Frontend Design Skill

## Description
This skill defines the instructions and best practices for the AI agent (and developers) to follow when creating and styling frontend components in the Prop Expense Manager. It focuses heavily on achieving a premium, glassmorphic UI using React and Tailwind CSS.

## Design Philosophy: Premium & Glassmorphic
1. **Glassmorphism Effects**: Use Tailwind's backdrop blur utilities (`backdrop-blur-md`, `backdrop-blur-lg`) combined with semi-transparent backgrounds (e.g., `bg-white/10` for light mode, `bg-gray-900/40` or `bg-black/20` for dark mode) to create depth.
2. **Borders & Shadows**: Apply subtle borders (`border border-white/20`) and soft, diffused shadows (`shadow-xl`, `shadow-black/10`) to define component boundaries without harsh solid lines.
3. **Typography**: Use modern, clean sans-serif fonts. Ensure high contrast and readability. Use appropriate font weights to establish hierarchy (e.g., `font-bold` for headings, `text-gray-400` for secondary text).
4. **Color Palette**: Utilize sophisticated gradients (`bg-gradient-to-r`, `from-indigo-500/20`, `to-purple-500/20`) to add visual interest. Avoid basic, solid, generic colors.
5. **Micro-animations & Interactions**: Make the UI feel alive and responsive. 
   - Apply hover effects (`hover:-translate-y-1`, `hover:scale-[1.02]`, `hover:bg-white/20`).
   - Add click animations (`active:scale-95`).
   - Use smooth transitions globally (`transition-all duration-300 ease-in-out`).

## Component Architecture Rules
1. **Location**: Place all reusable UI components in `Client/src/components` and page-level route components in `Client/src/pages`.
2. **Naming Convention**: Use PascalCase for all component files (e.g., `ExpenseCard.jsx`, `GlassModal.jsx`).
3. **Responsibility**: Keep components small, focused, and single-responsibility. Extract repeating UI elements into their own components.
4. **State Management**: Prefer local state (`useState`) for UI toggles. Use Redux slices (`Client/src/store`) only for global data like authentication or shared user preferences.

## Tech Stack & Tooling Guidelines
- **Styling**: Strictly use Tailwind CSS utility classes.
- **Icons**: Use `react-icons` (e.g., `react-icons/fi`, `react-icons/md`).
- **User Feedback**: Use `react-hot-toast` for toast notifications and `sweetalert2` for modal confirmations.
- **Data Display**: Use `@tanstack/react-table` for tabular data.
- **Forms**: Use `react-hook-form` for efficient form state and validation handling.

## Example: Standard Glassmorphic Container Template
When creating a new card, widget, or container, use this pattern as a baseline:

```jsx
import React from 'react';

const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      rounded-2xl shadow-xl 
      transition-all duration-300 ease-in-out
      hover:shadow-2xl hover:border-white/30 hover:-translate-y-1
      ${className}
    `}>
      {/* Subtle Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
```
