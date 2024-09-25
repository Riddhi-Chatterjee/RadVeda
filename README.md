# RadVeda: A Collaborative Tele-Radiology Platform

## Project Overview
**Duration:** January 2024 – May 2024  
**Technologies Used:** Spring Boot, Java, MySQL, JavaScript, CSS

RadVeda is a comprehensive tele-radiology platform designed to streamline the process of medical diagnosis through collaborative efforts. The platform enables doctors, lab personnel, and radiologists to work together in an efficient and secure manner. Patients can undergo prescribed tests, and their reports can be collaboratively generated and reviewed by medical professionals.

## Key Features
- **Test Prescription and Uploading:**
  - Doctors can prescribe radiology tests for patients.
  - Lab personnel upload test images in DICOM format.

- **Annotation and Diagnosis:**
  - Radiologists annotate the uploaded test images and provide detailed impressions.
  - Doctors review these impressions and collaborate with radiologists and other doctors to finalize the diagnosis report for the patient.

- **Security & Authorization:**
  - Implemented JWT-based authentication and authorization.
  - Encryption for data at rest and in transit.
  - Client-side input validation.
  - Email verification and OTP-based features for secure user actions.

- **Consent Management:**
  - Incorporated consent management for handling patient data securely and transparently.

- **Image Storage and Annotation:**
  - Stored and annotated medical images in DICOM format, ensuring high compatibility with medical imaging systems.

- **Chatting Sub-System:**
  - Built-in native chatting sub-system to facilitate real-time communication between doctors, radiologists, and patients.

- **Admin Dashboard:**
  - Provided analytics dashboards for system admins to monitor platform usage and performance metrics.

## Security Features
- **JWT Authentication & Authorization:** Role-based access to different sections of the platform, ensuring only authorized users have access.
- **Encryption:** Data is encrypted both at rest and during transit for secure data handling.
- **Email Verification & OTP:** Ensures secure sign-up and user actions through email verification and one-time password (OTP) mechanisms.
- **Client-Side Input Validation:** Ensures that only valid data is submitted by users, enhancing security and data integrity.

## Contributions
We welcome contributions from the community to help enhance and expand the RadVeda platform. Whether you're a developer, tester, or healthcare professional, your input can help improve the platform and make it more efficient and user-friendly.

## Future Enhancements
- Extending support for additional medical imaging formats.
- Enhancing the chat system with video conferencing capabilities for better collaboration.
- Integrating AI-based diagnostics for preliminary analysis of radiology images.

---

*This project was developed as part of the integrated master's program in Computer Science & Engineering at IIIT Bangalore.*
