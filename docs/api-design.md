# API Design

## Auth

- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`

## Students and Teams

- `POST /api/students/register`
- `GET /api/students/:id`
- `POST /api/teams`

## Content

- `GET /api/announcements`
- `POST /api/announcements`
- `GET /api/resources`
- `POST /api/resources`

## Submissions

- `POST /api/submissions`
- `GET /api/submissions/team/:teamId`

## Scheduling

- `POST /api/scheduling/availability`
- `GET /api/scheduling/slots`
- `POST /api/scheduling/book`

## Communications

- `POST /api/communications/email`
- `POST /api/communications/whatsapp`

## Chatbot

- `GET /api/chatbot/faqs`
- `POST /api/chatbot/ask`

