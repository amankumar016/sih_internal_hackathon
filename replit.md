# GUARD - Smart Tourist Safety Platform

## Overview

GUARD is a comprehensive smart tourist safety and incident response system designed for secure travel experiences in India. The platform integrates AI-powered risk analysis, real-time emergency response, community-driven safety features, and multi-agency coordination to protect tourists throughout their journey. Built with React/TypeScript frontend and Express.js backend, the system features an AI co-pilot called "Saarthi" that analyzes millions of data points for predictive safety insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and component-based architecture
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, consistent design
- **Styling**: Tailwind CSS with custom design system supporting glassmorphism effects and emergency-focused color palette
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for robust form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework using ESM modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL-based session storage
- **API Design**: RESTful endpoints with Express middleware for logging and error handling
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database implementations

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database queries
- **Schema**: Centralized schema definition in shared module with Zod integration
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon serverless PostgreSQL with connection pooling

### Component Architecture
- **Design System**: Custom component library following GUARD design guidelines
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance
- **Responsiveness**: Mobile-first design approach with responsive breakpoints
- **Theming**: CSS custom properties with light/dark mode support
- **Emergency Components**: Specialized panic button, safety widgets, and alert systems

### Authentication & Security
- **User Types**: Multi-role system supporting tourists, authorities, and guardians
- **Session Management**: Server-side sessions with PostgreSQL storage
- **Data Validation**: Zod schemas for runtime type checking and validation
- **Emergency Features**: Panic button system with multi-agency alert coordination

### Data Flow & State Management
- **Client State**: React Hook Form for form state, React Query for server state
- **API Communication**: Fetch-based HTTP client with credential handling
- **Real-time Features**: WebSocket architecture for emergency alerts and chat
- **Offline Support**: Service worker integration for offline functionality

### Development & Build Tools
- **Build System**: Vite for fast development and optimized production builds
- **Development**: Hot module replacement with runtime error overlays
- **Type Checking**: TypeScript with strict configuration and path mapping
- **Code Quality**: ESLint and Prettier integration for consistent code style

## External Dependencies

### Core Infrastructure
- **Database**: Neon serverless PostgreSQL for scalable data storage
- **CDN**: Google Fonts for Inter and Poppins typography
- **Asset Management**: Local asset storage with Vite optimization

### UI & Design Libraries
- **Component System**: Radix UI for accessible primitives
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS with PostCSS processing
- **Form Validation**: Zod for schema validation and type inference

### Development Tools
- **Build Tool**: Vite with React plugin and development optimizations
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Third-party Integrations
- **Maps**: Interactive mapping system for geofencing and location tracking
- **AI Services**: Integration points for Saarthi AI analysis engine
- **Communication**: Real-time chat and emergency alert systems
- **Government APIs**: Integration with emergency services and tourism boards

### Monitoring & Analytics
- **Error Tracking**: Runtime error monitoring and reporting
- **Performance**: Web vitals tracking and optimization
- **User Analytics**: Privacy-focused usage analytics for safety insights