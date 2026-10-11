# Fix: rename `status` -> `moderationStatus` (Comment + Testimonial)

Cause: Strapi 5's Admin panel mishandles any custom enumeration field named
`status` (strapi/documentation#2293) -> blank value + "Invalid status".

## 1. Strapi (VPS) - /var/www/nyamurongi-cms

Copy the four files in this zip over the matching paths in `src/api/`, then:

    npm run build
    pm2 restart <strapi-process-name>

Strapi adds a new `moderation_status` column on boot (default 'pending').
The old `status` column stays behind, unused - harmless.

## 2. Carry over existing rows (only 1 test comment today)

    mysql -u strapi_user -p strapi_db -e "
      UPDATE comments SET moderation_status = status;
    "
    # testimonials: only if you already have rows
    # UPDATE testimonials SET moderation_status = status;

(If testimonials has no `status` column yet, skip that line.)

## 3. Optional cleanup, once everything works

    ALTER TABLE comments DROP COLUMN status;
    ALTER TABLE testimonials DROP COLUMN status;

## 4. Next.js frontend - src/lib/strapi.js

Two filters reference the old name. Find:

    status: { $eq: "approved" }

It appears twice (approved comments in getArticleBySlug, approved
testimonials in getApprovedTestimonials). Replace both with:

    moderationStatus: { $eq: "approved" }

Nothing else in the frontend reads the field. Then on the VPS:

    npm run build && pm2 restart <nextjs-process-name>

## 5. Permissions

If the Admin shows Comment/Testimonial permissions reset, re-check
Settings -> Users & Permissions -> Roles -> Public: Comment
find/findOne/create. Renaming a field does not normally touch this.
