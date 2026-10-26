-- Links Lesson: explicitly bind lesson identity in student attempt policies.
-- This avoids an unqualified lesson_id resolving to the assignment row itself.
drop policy if exists ll_attempts_student_insert on public.ll_attempts;
create policy ll_attempts_student_insert
on public.ll_attempts for insert to authenticated
with check (
  student_id = public.ll_current_student_id()
  and status in ('in_progress','draft')
  and score is null
  and teacher_feedback is null
  and review = '{}'::jsonb
  and exists (
    select 1 from public.ll_assignments a
    where a.id = ll_attempts.assignment_id
      and a.lesson_id = ll_attempts.lesson_id
      and a.active = true
      and public.ll_can_access_assignment(a.id)
  )
);

drop policy if exists ll_attempts_student_update on public.ll_attempts;
create policy ll_attempts_student_update
on public.ll_attempts for update to authenticated
using (
  student_id = public.ll_current_student_id()
  and public.ll_can_access_assignment(assignment_id)
  and status in ('in_progress','draft')
)
with check (
  student_id = public.ll_current_student_id()
  and status in ('in_progress','draft','submitted')
  and (score is null or status = 'submitted')
  and teacher_feedback is null
  and review = '{}'::jsonb
  and exists (
    select 1 from public.ll_assignments a
    where a.id = ll_attempts.assignment_id
      and a.lesson_id = ll_attempts.lesson_id
      and a.active = true
      and public.ll_can_access_assignment(a.id)
  )
);
