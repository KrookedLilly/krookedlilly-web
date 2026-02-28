import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Send, MapPin, CheckCircle, Twitch } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-primary/15 rounded-full blur-[100px]" />
          <div className="absolute top-12 left-1/3 w-56 h-56 bg-teal/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Say Hi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Got a question? Wanna collab? Just want to chat?
            We're always down to hear from cool people
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div variants={fadeUp} custom={0}>
                <h2
                  className="text-2xl text-foreground mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Let&apos;s Connect
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you're interested in our work, have a wild collaboration idea, or
                  just want to talk about games and weird internet things - hit us up!
                </p>
              </motion.div>

              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "support@krookedlilly.com",
                  href: "",
                  subtext: "We'll respond within 48 hours (probably)",
                  tilt: "rotate-1",
                  accent: "primary" as const,
                },
                {
                  icon: Twitch,
                  label: "Twitch",
                  value: "krookedlilly",
                  href: "https://www.twitch.tv/krookedlilly",
                  subtext: "Catch us streaming games & dev sessions",
                  tilt: "-rotate-1",
                  accent: "teal" as const,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "The Basement",
                  href: "",
                  subtext: "...sometimes a hammock in the backyard",
                  tilt: "rotate-1",
                  accent: "primary" as const,
                },
              ].map((item, i) => {
                const styles = item.accent === "primary"
                  ? { hoverBorder: "hover:border-primary/30", shadow: "hover:shadow-[3px_3px_0px_0px_rgba(160,92,246,0.1)]", iconBg: "bg-primary/10 border-primary/20", iconColor: "text-primary" }
                  : { hoverBorder: "hover:border-teal/30", shadow: "hover:shadow-[3px_3px_0px_0px_rgba(34,211,238,0.1)]", iconBg: "bg-teal/10 border-teal/20", iconColor: "text-teal" };
                return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  custom={i + 1}
                  className={`flex items-start gap-4 p-4 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${styles.hoverBorder} transition-all hover:-translate-y-1 ${styles.shadow} ${item.tilt} hover:rotate-0 rounded-sm`}
                >
                  <div className={`w-12 h-12 ${styles.iconBg} border flex items-center justify-center shrink-0 -rotate-3 rounded-sm`}>
                    <item.icon className={`w-5 h-5 ${styles.iconColor}`} />
                  </div>
                  <div>
                    <h4
                      className="text-foreground uppercase tracking-wider text-sm"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      {item.label}
                    </h4>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-foreground text-sm hover:text-teal transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground text-sm">{item.value}</p>
                    )}
                    <p className="text-muted-foreground text-xs mt-0.5">{item.subtext}</p>
                  </div>
                </motion.div>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="p-8 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm"
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-lime/10 border-2 border-lime/30 flex items-center justify-center mx-auto mb-6 rotate-6 rounded-sm">
                      <CheckCircle className="w-8 h-8 text-lime" />
                    </div>
                    <h3
                      className="text-2xl text-foreground mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for reaching out! We'll get back to you as soon as we can
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-lime hover:text-lime/80 transition-colors uppercase tracking-wider text-sm"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-foreground mb-2 text-xs uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-foreground mb-2 text-xs uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-foreground mb-2 text-xs uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        What&apos;s this about?
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-input-background border-2 border-white/10 rounded-sm text-foreground focus:outline-none focus:border-primary/50 appearance-none"
                      >
                        <option value="" className="text-muted-foreground">
                          Pick one...
                        </option>
                        <option value="general">General Inquiry</option>
                        <option value="collab">Collaboration</option>
                        <option value="feedback">Feedback</option>
                        <option value="press">Press / Media</option>
                        <option value="other">Other / Just Vibing</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-foreground mb-2 text-xs uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us what's on your mind..."
                        className="w-full px-4 py-3 bg-input-background border-2 border-white/10 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-teal text-white rounded-sm transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(160,92,246,0.3)] w-full sm:w-auto justify-center uppercase tracking-wider text-sm border-2 border-transparent"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      <Send className="w-4 h-4" />
                      Send It
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}