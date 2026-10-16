import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Clock,
  ChevronRight,
  Building2,
  Compass,
  FlaskConical,
  Briefcase,
  BookOpen,
  GraduationCap,
  Globe2,
  Plane
} from 'lucide-react'
import { internships, blogs, semexBlogs } from '../data/dummy'

const iconMap = {
  Building2,
  Compass,
  FlaskConical,
  Briefcase,
  BookOpen,
  GraduationCap,
  Globe2,
  Plane,
}

const tabs = ['Internship Experiences', 'Student Blogs', 'Semester Exchange (SemEx)']

export default function Experience() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const tabParam = parseInt(searchParams.get('tab')) || 0
  const [activeTab, setActiveTab] = useState(tabParam)

  useEffect(() => {
    setActiveTab(tabParam)
  }, [tabParam])

  return (
    <div className="bg-[#faf9f5] min-h-screen text-neutral-900 pt-16">
      {/* Editorial Clean Header */}
      <div className="py-16 sm:py-20 text-center border-b border-neutral-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Student Perspectives
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-3">
            Experiences
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Firsthand accounts from seniors: core civil engineering internships, semester exchange chronicles, and academic strategy guides.
          </p>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="sticky top-16 z-30 bg-[#faf9f5]/95 backdrop-blur-md border-b border-neutral-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full transition-all duration-150 ${
                  activeTab === i
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab 0: Core Internships (Minimal Cards, No Dumped Info, Click navigates to new page) */}
        {activeTab === 0 && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Core Engineering
                </p>
                <h2 className="font-display text-2xl font-bold text-neutral-950">
                  Internship Experiences
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {internships.length} Stories
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map(intern => (
                <Link
                  key={intern.id}
                  to={`/experience/${intern.id}`}
                  className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Company name as primary bold heading */}
                    <h3 className="font-display font-bold text-xl text-neutral-950 group-hover:text-neutral-700 transition-colors mb-1">
                      {intern.company}
                    </h3>

                    {/* Role down / below */}
                    <p className="text-xs font-semibold text-neutral-600 mb-4 pb-3 border-b border-neutral-100">
                      {intern.role}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-neutral-400" />
                        {intern.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-neutral-400" />
                        {intern.duration}
                      </span>
                    </div>

                    {/* Clean 1-sentence teaser */}
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {intern.excerpt}
                    </p>
                  </div>

                  {/* Card bottom: author & view link */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-medium">
                      By {intern.author} ({intern.batch})
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-neutral-900 group-hover:gap-1.5 transition-all">
                      <span>Read Story</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tab 1: Student Blogs */}
        {activeTab === 1 && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Student Insights
                </p>
                <h2 className="font-display text-2xl font-bold text-neutral-950">
                  DAMP Student Blogs
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {blogs.length} Articles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(blog => {
                const BlogIcon = iconMap[blog.icon] || BookOpen
                return (
                  <Link
                    key={blog.id}
                    to={`/blogs/${blog.id}`}
                    className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Topic Category with clean Icon (No AI slop gradients) */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                          <BlogIcon size={14} className="text-neutral-900" />
                          <span>{blog.category}</span>
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-neutral-950 leading-snug mb-2 group-hover:text-neutral-700 transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-medium">
                        {blog.author} · {blog.batch}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-neutral-900 group-hover:gap-1.5 transition-all">
                        <span>Read</span>
                        <ChevronRight size={13} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab 2: SemEx Chronicles */}
        {activeTab === 2 && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Global Exchange
                </p>
                <h2 className="font-display text-2xl font-bold text-neutral-950">
                  Semester Exchange Chronicles
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {semexBlogs.length} Chronicles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {semexBlogs.map(semex => (
                <Link
                  key={semex.id}
                  to={`/blogs/${semex.id + 100}`}
                  className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-neutral-800">
                      <Globe2 size={15} className="text-neutral-900" />
                      <span>{semex.university}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-neutral-950 leading-snug mb-2 group-hover:text-neutral-700 transition-colors">
                      {semex.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {semex.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-medium">
                      By {semex.author} ({semex.batch})
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-neutral-900 group-hover:gap-1.5 transition-all">
                      <span>Read Chronicle</span>
                      <ChevronRight size={13} />
                    </span>
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
