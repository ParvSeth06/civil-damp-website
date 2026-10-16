import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  GraduationCap,
  FileText,
  User,
  FlaskConical,
  Award,
  ExternalLink,
  ChevronRight,
  Layers,
  Clock
} from 'lucide-react'
import { allCourses } from '../data/dummy'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find course either by numeric ID or by course code (case-insensitive)
  const course = allCourses.find(
    c => c.id.toString() === id || 
         c.code.toLowerCase().replace(/\s+/g, '') === id.toLowerCase().replace(/[^a-z0-9]/g, '') ||
         c.code.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
  ) || allCourses[0]

  if (!course) {
    return (
      <div className="bg-[#faf9f5] min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl border border-neutral-200">
          <p className="text-neutral-500 mb-4 text-sm">Course information not found.</p>
          <Link to="/academics" className="text-xs font-bold text-neutral-900 underline">
            Return to Academics
          </Link>
        </div>
      </div>
    )
  }

  // Related courses in the same specialization or semester
  const relatedCourses = allCourses
    .filter(c => c.id !== course.id && (c.type === course.type || c.specialization === course.specialization))
    .slice(0, 3)

  return (
    <div className="bg-[#faf9f5] min-h-screen text-neutral-900 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="pt-6 pb-8">
          <button
            onClick={() => navigate('/academics')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Academics & Curriculum</span>
          </button>
        </div>

        {/* Course Header Banner */}
        <article className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs mb-10">
          <div className="border-b border-neutral-100 pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono mb-3">
              <span className="font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
                {course.code}
              </span>
              <span>·</span>
              <span>Semester {course.semester}</span>
              <span>·</span>
              <span>{course.credits} Credits</span>
              <span>·</span>
              <span className="text-neutral-700 font-sans font-medium">{course.type}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              {course.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5 font-medium">
                <User size={13} className="text-neutral-400" />
                <span>Instructor: {course.professor}</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <FlaskConical size={13} className="text-neutral-400" />
                <span>Specialization: {course.specialization || 'Department Core'}</span>
              </span>
            </div>
          </div>

          {/* Quick Academic Meta Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 mb-10 text-xs">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Prerequisites & Preparation
              </p>
              <p className="text-neutral-800 font-medium leading-relaxed">
                {course.prerequisites || 'Basic First-Year Engineering Mathematics & Mechanics'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Typical Grading Structure
              </p>
              <p className="text-neutral-800 font-medium leading-relaxed">
                {course.grading || 'Quizzes (20%), Midsem (30%), Endsem (40%), Lab/Assignments (10%)'}
              </p>
            </div>
          </div>

          {/* Senior Strategy & Course Review */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-neutral-800" />
              <h2 className="font-display text-xl font-bold text-neutral-950">
                Senior Mentorship Review & Academic Strategy
              </h2>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
              {course.review}
            </div>
          </section>

          {/* Syllabus & Module Breakdown */}
          {course.syllabus && course.syllabus.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-neutral-800" />
                <h2 className="font-display text-xl font-bold text-neutral-950">
                  Comprehensive Course Syllabus & Topics Covered
                </h2>
              </div>
              <div className="space-y-3">
                {course.syllabus.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-50/60 border border-neutral-200/60 flex items-start gap-3.5 text-xs sm:text-sm text-neutral-700"
                  >
                    <span className="font-mono text-xs font-bold text-neutral-400 mt-0.5 shrink-0">
                      Module {idx + 1}
                    </span>
                    <span className="leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Standard Textbooks & Reference Codes */}
          {course.textbooks && course.textbooks.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-neutral-800" />
                <h2 className="font-display text-xl font-bold text-neutral-950">
                  Recommended Textbooks & Indian Standards (IS Codes)
                </h2>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                {course.textbooks.map((book, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-neutral-400 font-mono text-xs mt-0.5">•</span>
                    <span className="font-medium text-neutral-800">{book}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Department DAMP Advice */}
          <div className="p-6 rounded-2xl bg-neutral-100/60 border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
            <p className="font-bold text-neutral-900 mb-1">
              Have questions regarding course registration or prerequisites?
            </p>
            <p>
              Connect with your assigned DAMP senior mentor or reach out to the Civil DAMP coordinators (Jinay Vora & Vivaan Jain) via the{' '}
              <Link to="/team" className="text-neutral-950 font-semibold underline">
                Team Page
              </Link>.
            </p>
          </div>
        </article>

        {/* Related Courses Section */}
        {relatedCourses.length > 0 && (
          <div>
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Explore More
              </p>
              <h3 className="font-display text-xl font-bold text-neutral-950">
                Related Department Offerings
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCourses.map(rel => (
                <Link
                  key={rel.id}
                  to={`/course/${rel.id}`}
                  className="bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-neutral-500">{rel.code}</span>
                    <h4 className="font-display font-bold text-sm text-neutral-950 group-hover:text-neutral-700 transition-colors mt-1 mb-2">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {rel.professor} · Sem {rel.semester}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-900 font-semibold">
                    <span>View course</span>
                    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
