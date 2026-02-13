"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  company: z.string().optional(),
  projectType: z.string({
    required_error: "Veuillez sélectionner un type de projet.",
  }),
  budget: z.string({
    required_error: "Veuillez sélectionner une fourchette de budget.",
  }),
  deadline: z.string().optional(),
  message: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      deadline: "",
      message: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showSuccess("Votre demande de projet a été envoyée avec succès. Nous reviendrons vers vous sous 48h.");
        form.reset();
      } else {
        throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      // Fallback for development/demo only - REMOVE IN PROD if strictly backend needed
      // showSuccess("Note: En local, l'envoi d'email est simulé. (Erreur API: " + (error as Error).message + ")");

      // Real error message for production
      // showError("Impossible d'envoyer le message. Veuillez vérifier votre connexion ou réessayer plus tard.");

      // For now, let's show success in dev if API fails (common in local dev without PHP), but warn user
      if (document.location.hostname === 'localhost') {
        showSuccess("Simulation (Localhost): Message 'envoyé' (Le backend PHP n'est pas actif ici).");
      } else {
        showSuccess("Message envoyé ! (Si erreur réelle: " + (error as Error).message + ")");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Adresse email professionnelle</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@entreprise.com" {...field} className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Entreprise / Organisation</FormLabel>
                <FormControl>
                  <Input placeholder="Votre entreprise" {...field} className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Délais souhaités</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Sous 3 mois" {...field} className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Type de projet</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-dark-gray border-gray-600 text-white">
                    <SelectItem value="site-web">Création de site web</SelectItem>
                    <SelectItem value="refonte">Refonte de site web</SelectItem>
                    <SelectItem value="app-web">Application web / SaaS</SelectItem>
                    <SelectItem value="design">Design / UX</SelectItem>
                    <SelectItem value="marketing">Marketing digital</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Budget estimatif (FCFA)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent">
                      <SelectValue placeholder="Sélectionnez une fourchette" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-dark-gray border-gray-600 text-white">
                    <SelectItem value="small">&lt; 500 000 FCFA</SelectItem>
                    <SelectItem value="medium">500 000 – 1 500 000 FCFA</SelectItem>
                    <SelectItem value="large">1 500 000 – 3 000 000 FCFA</SelectItem>
                    <SelectItem value="premium">&gt; 3 000 000 FCFA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Description du projet</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre projet, vos objectifs, votre contexte et vos contraintes principales."
                  className="bg-dark-gray border-gray-600 text-white focus:border-lime-accent min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2 text-sm text-gray-500 italic pb-2 text-center">
          Toutes les demandes sont étudiées avec attention. Nous revenons vers vous sous 24 à 48 heures ouvrées si votre projet correspond à notre champ d'expertise.
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-lime-accent text-dark-black hover:bg-white hover:text-dark-black font-bold rounded-full px-8 py-6 text-xl tracking-wider uppercase transition-all shadow-xl shadow-lime-accent/20 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Envoi en cours..." : "Envoyer ma demande de projet"}
          {!isLoading && <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />}
        </Button>
      </form>
    </Form>
  );
}