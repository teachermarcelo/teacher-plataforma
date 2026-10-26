-- Links Lesson: additive archive support for teacher library.
-- Existing lesson rows are preserved; NULL archived_at means active.
alter table public.ll_lessons
  add column if not exists archived_at timestamptz;

create index if not exists ll_lessons_teacher_archived_updated_idx
  on public.ll_lessons (teacher_id, archived_at, updated_at desc);

comment on column public.ll_lessons.archived_at is
  'When set, lesson is archived in the teacher library and should not be assigned to students.';
