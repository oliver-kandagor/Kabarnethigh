import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import schoolGate from "@/assets/school-gate.jpg";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", content: "P.O. Box 16, Kabarnet, Baringo County, Kenya" },
    { icon: Phone, title: "Phone", content: "+254 53 22459" },
    { icon: Mail, title: "Email", content: "info@kabarnethigh.sc.ke" },
    { icon: Clock, title: "Office Hours", content: "Mon - Fri: 8:00 AM - 5:00 PM" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Kabarnet High School</title>
        <meta name="description" content="Get in touch with Kabarnet High School. Find our location, phone, email, and send us a message." />
      </Helmet>

      <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={schoolGate} alt="Contact KHS" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground mb-6">Contact Us</h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">We'd love to hear from you</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Your Name" required />
                      <Input type="email" placeholder="Your Email" required />
                    </div>
                    <Input placeholder="Subject" required />
                    <Textarea placeholder="Your Message" rows={5} required />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
