Concrete Solutions Sydney —  RRR Bricklaying

This is a Next.js web application built for Concrete Solutions Sydney, providing a responsive, SEO-optimized company website with smooth animations, contact forms, and blog management. this project leverages modern web technologies for performance, maintainability, and ease of deployment.

Tech Stack

    Category	                    Tools / Libraries
    Frontend Framework	            Next.js (App Router)
    Styling	                        Tailwind CSS, AOS for scroll animations
    Forms & Email	                EmailJS for client-side email delivery
    Media Hosting	                Cloudinary for image uploads and optimization
    Database	                    Neon — serverless PostgreSQL
    Deployment	                    Vercel
    Alert & Feedback	            SweetAlert2
    Icons & UI Components	        React Icons, custom Tailwind components, also from this site https://www.coolsymbol.top/


Getting Started

    First, install dependencies and start the development server:
        npm install
        npm run dev

    Then open http://localhost:3000

    Features

        Modern UI & Animations — Built with Tailwind CSS and AOS
        Contact Form with EmailJS — Sends messages directly via EmailJS templates
        Cloudinary Uploads — Handles media uploads in blog and CMS sections
        Blog Management — Admin dashboard for post creation, image upload, and auto slug generation
        SEO Optimized — Meta tags and responsive design
        Deployed on Vercel — CI/CD connected with GitHub    
    
    Environment Variables

        NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

        NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER=concreate/blog
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
        NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_secret

        DATABASE_URL=your_neon_postgres_connection_url

    Deployment
        The app is hosted on Verce - 
        
        client-site Url ->              https://concreate-solutions-sydney.vercel.app/
        Admin panel Url ->              https://concreate-solutions-sydney.vercel.app/admin/login

        Admin credentials->     email-              admin@example.com
                                password-           Admin@12345
        

    Table structure 
        model User {
        id           Int        @id @default(autoincrement())
        email        String     @unique
        username     String     @unique
        passwordHash String
        isActive     Boolean    @default(true)
        createdAt    DateTime   @default(now())
        updatedAt    DateTime   @updatedAt

        roles        UserRole[]
        posts        Post[]

        @@index([email])
        @@index([username])
        }
        -----------------------------------------------------
        model Role {
        id          Int        @id @default(autoincrement())
        name        String     @unique //  "admin", "user"
        description String?
        createdAt   DateTime   @default(now())
        updatedAt   DateTime   @updatedAt

        users       UserRole[]
        }
        -----------------------------------------------------
        model UserRole {
        userId     Int
        roleId     Int
        assignedAt DateTime @default(now())

        user User @relation(fields: [userId], references: [id], onDelete: Cascade)
        role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

        @@id([userId, roleId]) 
        @@index([userId])
        @@index([roleId])
        }
        -----------------------------------------------------
        model Post {
        id          Int       @id @default(autoincrement())
        title       String
        slug        String    @unique
        imageUrl    String?
        description String
        content     String
        publishedAt DateTime  @default(now())
        createdAt   DateTime  @default(now())
        updatedAt   DateTime  @updatedAt

        authorId Int?
        author   User?     @relation(fields: [authorId], references: [id])

        @@index([publishedAt])
        @@index([authorId])
        }
        -----------------------------------------------------

Additional Resources
    Next.js Documentation       https://nextjs.org/docs
    EmailJS Docs                https://www.emailjs.com/docs/
    Cloudinary Upload API       https://cloudinary.com/documentation/upload_images
    Neon PostgreSQL Docs        https://neon.com/docs/introduction
    AOS Animation Docs          https://michalsnik.github.io/aos/


Author - Sachintha Hasaranga Niyangoda.