# Frontend Structure Documentation

This document explains the scalable frontend architecture implemented for the patient dashboard application.

## Project Structure

```
src/
├── app/                       # Next.js App Router
│   ├── globals.css           # Global styles with design tokens
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Homepage
├── components/
│   ├── ui/                   # Reusable UI primitives
│   │   ├── Button.tsx        # Accessible button component
│   │   ├── Card.tsx          # Card layouts and variations
│   │   ├── Container.tsx     # Layout container component
│   │   ├── Input.tsx         # Form input component
│   │   └── index.ts          # UI components barrel export
│   ├── sections/             # Page sections
│   │   ├── Header.tsx        # Header section wrapper
│   │   ├── Footer.tsx        # Footer section wrapper
│   │   └── index.ts          # Sections barrel export
├── lib/                      # Shared utilities
│   ├── i18n.ts              # Internationalization system
│   └── utils.ts             # Common utility functions
├── locales/                  # Translation files
│   └── en/
│       └── common.json       # English translations
├── config/                   # Configuration
│   └── env.ts               # Typed environment variables
└── [legacy structure]       # Existing @components, @utils, etc.
```

## Design System

### Design Tokens

All design tokens are defined in `src/app/globals.css` under the `@theme` directive:

- **Colors**: Brand colors, status colors, UI element colors
- **Typography**: Font sizes, line heights, font families
- **Spacing**: Consistent spacing scale
- **Border Radius**: Standardized corner radii
- **Breakpoints**: Responsive design breakpoints

### Usage Example

```css
/* Use design tokens via utility classes */
.button {
  @apply bg-brand-deep text-white rounded-lg px-4 py-2;
}

/* Or access CSS variables directly */
.custom-element {
  background-color: var(--color-brand-deep);
  border-radius: var(--radius-lg);
}
```

## Internationalization (i18n)

### Adding New Translations

1. **Add keys to locale files**:
   ```json
   // src/locales/en/common.json
   {
     "section": {
       "newKey": "English text"
     }
   }
   ```

2. **Use in components**:
   ```tsx
   import { t } from '@/lib/i18n';
   
   function MyComponent() {
     return <p>{t('section.newKey')}</p>;
   }
   ```

3. **With parameters**:
   ```tsx
   // Translation: "Hello {{name}}"
   {t('greeting.hello', 'en', { name: 'World' })}
   ```

### Translation Guidelines

- **No hardcoded text**: All user-facing text must use i18n keys
- **Semantic keys**: Use descriptive, hierarchical keys (e.g., `dashboard.title`)
- **ARIA labels**: Include accessibility text in translations

## UI Components

### Component Structure

```tsx
// components/ui/MyComponent.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <div
        className={cn(
          'base-styles',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';
export { MyComponent };
```

### Adding New UI Components

1. Create component in `components/ui/`
2. Follow accessibility patterns (forwardRef, ARIA attributes)
3. Use design tokens for styling
4. Export from `components/ui/index.ts`
5. Add tests in `__tests__/` directory

### Accessibility Guidelines

- **Focus management**: Visible focus indicators with `focus-visible:`
- **Semantic HTML**: Use appropriate HTML elements
- **ARIA attributes**: Include labels, descriptions, roles
- **Keyboard navigation**: Support tab order and keyboard interactions

## Environment Configuration

### Adding Environment Variables

1. **Define in schema**:
   ```ts
   // src/config/env.ts
   const envSchema = z.object({
     NEW_VARIABLE: z.string(),
   });
   ```

2. **Add to .env.example**:
   ```bash
   NEW_VARIABLE=example_value
   ```

3. **Use in application**:
   ```ts
   import { env } from '@/config/env';
   
   const apiUrl = env.NEW_VARIABLE;
   ```

## Styling Guidelines

### Do's

✅ Use design tokens via utility classes  
✅ Leverage component variants for different styles  
✅ Use semantic color names (`bg-brand-deep` not `bg-blue-900`)  
✅ Follow mobile-first responsive design  
✅ Maintain consistent spacing with design system  

### Don'ts

❌ Use inline styles (`style={{}}`)  
❌ Use magic numbers (`p-[23px]`)  
❌ Hardcode colors (`bg-[#072635]`)  
❌ Mix design systems  
❌ Forget accessibility considerations  

## Page Structure

### Page Component Pattern

```tsx
// pages should be thin, composing sections
export default function MyPage() {
  return (
    <>
      <PageHeader />
      <PageContent />
      <PageFooter />
    </>
  );
}
```

### Section Component Pattern

```tsx
// sections contain business logic and data fetching
export function PageContent() {
  const { data } = useData();
  
  return (
    <section className="py-8">
      <Container>
        <UIComponent data={data} />
      </Container>
    </section>
  );
}
```

## Testing

### Component Testing

```tsx
// components/ui/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct accessibility attributes', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Development Workflow

1. **Start development**: `npm run dev`
2. **Lint code**: `npm run lint`
3. **Run tests**: `npm test`
4. **Build production**: `npm run build`

## Migration from Legacy Structure

The application maintains backward compatibility with the existing `@components`, `@utils`, and `@contents` structure while gradually migrating to the new system:

- New components should be created in `components/ui/` or `components/sections/`
- Existing components can be gradually refactored
- Legacy imports will continue to work during transition

## Best Practices

1. **Component Composition**: Build complex UIs from simple, reusable components
2. **Type Safety**: Use TypeScript interfaces for all component props
3. **Performance**: Use React best practices (memo, useMemo, useCallback where appropriate)
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **Consistency**: Follow established patterns and conventions