import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Loader2, ArrowRight } from 'lucide-react';
import GlobalCta from '@/components/GlobalCta';
import { supabase } from '@/integrations/supabase/client';
import { projectsData } from '@/data/servicesData';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { sanitizeHtml } from '@/lib/sanitize';

const ProjectDetailPage: React.FC = () => {
    const { projectSlug } = useParams<{ projectSlug: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [prevProject, setPrevProject] = useState<Project | null>(null);
    const [nextProject, setNextProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!projectSlug) {
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            setLoading(true);

            // Simpler logic: mostly relying on local data for next/prev navigation consistency
            // In a real full-stack app, we'd fetch the whole list or use specific queries
            let foundProject: Project | undefined;
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('slug', projectSlug)
                .eq('status', 'published')
                .single();

            if (data) {
                foundProject = data as Project;
            } else {
                foundProject = projectsData.find(p => p.slug === projectSlug);
            }

            if (foundProject) {
                setProject(foundProject);

                // Determine Next/Prev from local static data for now (simplifies navigation logic vs DB cursors)
                const currentIndex = projectsData.findIndex(p => p.slug === projectSlug);
                if (currentIndex !== -1) {
                    setPrevProject(currentIndex > 0 ? projectsData[currentIndex - 1] : null);
                    setNextProject(currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null);
                }
            } else {
                setProject(null);
            }
            setLoading(false);
        };

        fetchProject();
    }, [projectSlug]);

    // SEO Meta Tags
    useEffect(() => {
        if (project) {
            document.title = `Projet ${project.title} – ${project.category} performant | Wendooka`;
            const metaDesc = document.querySelector('meta[name="description"]');
            const content = project.meta_description || `Découvrez comment Wendooka a conçu un ${project.category} pour ${project.title} : approche, solutions et résultats.`;
            if (metaDesc) metaDesc.setAttribute('content', content);
        }
    }, [project]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
            </div>
        );
    }

    if (!project) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="bg-dark-black text-white">
            <Header />
            <main>
                {/* 3. Hero Section (Positionnement Immédiat) */}
                <div className="relative py-24 md:py-40 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }}>
                    <div className="absolute inset-0 bg-dark-black/85 z-0"></div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <Badge className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 mb-6 px-4 py-1 text-base font-bold uppercase tracking-wider">
                            {project.category}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6">
                            {project.title} – {project.category} orienté performance
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                            Conception d’un(e) {project.category.toLowerCase()} sur-mesure pour répondre à des objectifs précis de {project.category === 'E-commerce' ? 'conversion' : project.category === 'Application Web' ? 'scalabilité' : 'performance'} et de croissance.
                        </p>
                    </div>
                </div>

                <section className="py-16 bg-dark-black border-b border-gray-800">
                    <div className="container mx-auto px-4">
                        <Link to="/portfolio" className="inline-flex items-center text-gray-400 hover:text-lime-accent mb-12 transition-colors group">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Retour aux réalisations
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                            {/* 4. Snapshot Projet (Bloc de Contexte Rapide) */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-dark-gray p-8 rounded-3xl border border-gray-800 shadow-xl sticky top-24">
                                    <h3 className="text-xl font-bold mb-6 font-poppins text-white border-b border-gray-700 pb-4">Infos clés</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Client</p>
                                            <p className="font-semibold text-white">{project.client || 'Confidentiel'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Type de projet</p>
                                            <p className="font-semibold text-white">{project.category}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Rôle de Wendooka</p>
                                            <p className="font-semibold text-white">{project.role || 'Conseil, Design, Développement'}</p>
                                        </div>
                                        {project.duration && (
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Durée du projet</p>
                                                <p className="font-semibold text-white">{project.duration}</p>
                                            </div>
                                        )}
                                        {project.year && (
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Année</p>
                                                <p className="font-semibold text-white">{project.year}</p>
                                            </div>
                                        )}
                                        {project.related_services && project.related_services.length > 0 && (
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Expertises mobilisées</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {project.related_services.map(s => (
                                                        <span key={s.slug} className="text-[10px] bg-white/5 border border-gray-800 px-2 py-0.5 rounded text-gray-400">
                                                            {s.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {project.link && (
                                        <Button asChild className="w-full mt-8 bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-xl py-6 transition-all">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                Voir le site <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="lg:col-span-3 space-y-20">

                                {/* 5. Context & Challenges */}
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-white font-poppins flex items-center gap-4">
                                        <span className="w-8 h-1 bg-lime-accent"></span> Contexte et enjeux du projet
                                    </h2>
                                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                                        {project.context ? (
                                            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.context) }} />
                                        ) : (
                                            <p>{project.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* 6. Identified Problems */}
                                {project.problems_identified && project.problems_identified.length > 0 && (
                                    <div className="bg-dark-gray/50 p-8 md:p-12 rounded-3xl border border-gray-800 border-l-4 border-l-red-500">
                                        <h2 className="text-2xl font-bold text-white mb-6 font-poppins">Problématiques identifiées</h2>
                                        <ul className="space-y-4">
                                            {project.problems_identified.map((problem, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                                                    <span>{problem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* 7. Our Solution */}
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-white font-poppins flex items-center gap-4">
                                        <span className="w-8 h-1 bg-lime-accent"></span> La solution mise en place
                                    </h2>
                                    <div className="bg-dark-gray p-8 md:p-12 rounded-3xl border border-gray-800 shadow-inner">
                                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 mb-10"
                                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.solution || project.description) }} />

                                        {/* Breakdown axes could be H3 here if they were separate fields, 
                                            for now they are part of the solution HTML */}
                                    </div>
                                </div>

                                {/* 8. Results & Impact */}
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-white font-poppins flex items-center gap-4 text-lime-accent">
                                        <span className="w-8 h-1 bg-lime-accent"></span> Résultats et impact du projet
                                    </h2>
                                    <div className="bg-lime-accent/5 p-8 md:p-12 rounded-3xl border border-lime-accent/20">
                                        <div className="prose prose-invert prose-lg max-w-none text-gray-200"
                                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.results || '<p>Impact business positif et amélioration des performances clés.</p>') }} />
                                    </div>
                                </div>

                                {/* Testimonial Section */}
                                {project.testimonial && (
                                    <div className="space-y-8">
                                        <h2 className="text-3xl font-bold text-white font-poppins flex items-center gap-4">
                                            <span className="w-8 h-1 bg-lime-accent"></span> Le mot du client
                                        </h2>
                                        <div className="bg-dark-gray p-8 md:p-10 rounded-3xl border border-gray-800 relative">
                                            <div className="absolute top-8 right-8 text-lime-accent/20">
                                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                                                </svg>
                                            </div>
                                            <blockquote className="relative z-10">
                                                <p className="text-xl md:text-2xl text-gray-200 italic font-light mb-8 leading-relaxed">
                                                    "{project.testimonial.content}"
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={project.testimonial.image}
                                                        alt={project.testimonial.name}
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-lime-accent/50"
                                                    />
                                                    <div>
                                                        <cite className="not-italic font-bold text-white text-lg block">{project.testimonial.name}</cite>
                                                        <span className="text-lime-accent text-sm">{project.testimonial.role}</span>
                                                    </div>
                                                </div>
                                            </blockquote>
                                        </div>
                                    </div>
                                )}

                                {/* 10. Representativeness */}
                                {project.representative_reason && (
                                    <div className="space-y-6 pt-10 border-t border-gray-800">
                                        <h2 className="text-2xl font-bold text-white font-poppins">Pourquoi ce projet est représentatif de notre approche</h2>
                                        <p className="text-gray-400 italic leading-relaxed text-lg">
                                            "{project.representative_reason}"
                                        </p>
                                    </div>
                                )}

                                {/* 9. Related Services (Internal Maillage) */}
                                {project.related_services && project.related_services.length > 0 && (
                                    <div className="mt-20 pt-10 border-t border-gray-800">
                                        <h3 className="text-xl font-bold text-white mb-6">Expertises mobilisées sur ce projet</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {project.related_services.map(service => (
                                                <Link
                                                    key={service.slug}
                                                    to={`/services/${service.slug}`}
                                                    className="bg-white/5 hover:bg-lime-accent hover:text-dark-black text-white px-8 py-4 rounded-2xl font-bold border border-gray-800 hover:border-lime-accent transition-all"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gallery remains as proof */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mt-32">
                                <h3 className="text-3xl font-bold text-white mb-10 text-center font-poppins">Preuves visuelles de la solution</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                                            <img src={img} alt={`Réalisation ${i}`} className="w-full h-auto object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Navigation */}
                <section className="py-12 bg-dark-gray">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center">
                            {prevProject ? (
                                <Link to={`/portfolio/${prevProject.slug}`} className="group max-w-[45%]">
                                    <span className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Projet précédent</span>
                                    <span className="text-lg font-bold flex items-center group-hover:text-lime-accent transition-colors">
                                        <ArrowLeft className="mr-2 h-4 w-4" /> {prevProject.title}
                                    </span>
                                </Link>
                            ) : <div></div>}
                            {nextProject ? (
                                <Link to={`/portfolio/${nextProject.slug}`} className="group text-right max-w-[45%]">
                                    <span className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Projet suivant</span>
                                    <span className="text-lg font-bold flex items-center justify-end group-hover:text-lime-accent transition-colors">
                                        {nextProject.title} <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </Link>
                            ) : <div></div>}
                        </div>
                    </div>
                </section>

                {/* 11. Final CTA (Similaire ?) */}
                <section className="py-20 bg-lime-accent text-dark-black">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">Vous avez un projet similaire ?</h2>
                        <p className="text-xl mb-10 max-w-3xl mx-auto font-medium">
                            Si vous faites face à des enjeux similaires ou souhaitez concevoir une solution digitale performante, échangeons sur votre projet et définissons ensemble la meilleure approche.
                        </p>
                        <Button asChild variant="default" size="lg" className="bg-dark-black text-white hover:bg-gray-900 rounded-full px-10 py-7 text-lg uppercase tracking-wider font-bold shadow-xl">
                            <Link to="/contact">Discuter de mon projet</Link>
                        </Button>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ProjectDetailPage;
