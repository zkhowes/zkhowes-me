import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dare Vocem — Privacy Policy",
  description:
    "Privacy policy for Dare Vocem, an iOS app that helps people with aphasia complete sentences.",
};

const LAST_UPDATED = "May 16, 2026";

export default function DareVocemPrivacy() {
  return (
    <>
      <section className="panel-border p-6 flex-1">
        <h1 className="text-3xl font-bold mb-2">Dare Vocem — Privacy Policy</h1>
        <p className="text-sm opacity-70 mb-8">Last updated: {LAST_UPDATED}</p>

        <p className="text-lg leading-relaxed mb-6">
          Dare Vocem is an iOS app that helps people with aphasia complete
          sentences. This policy explains what data the app collects, where
          it goes, and how it&apos;s used.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Who runs this app</h2>
        <p className="mb-6 leading-relaxed">
          Dare Vocem is a personal project by Zach Howes. There is no company,
          no advertising, and no third-party analytics. Contact:{" "}
          <a href="mailto:zkhowes@gmail.com" className="underline">
            zkhowes@gmail.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">What we collect</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">Account information</h3>
        <p className="mb-4 leading-relaxed">
          When you sign in with Apple or Google, the app stores your email
          address and a stable account identifier. We do not receive your
          password from either provider.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          Microphone audio
        </h3>
        <p className="mb-4 leading-relaxed">
          When you tap the microphone, the device captures your speech. The
          transcription happens on-device using Apple&apos;s Speech framework;
          the raw audio is not sent to our servers. When the app needs to
          generate next-word predictions for what you said, only the
          transcribed text — never the audio — is sent to the prediction
          service (Anthropic Claude).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          Phrases and sentences you compose
        </h3>
        <p className="mb-4 leading-relaxed">
          Sentences you build, phrases you save, and individual word
          selections are stored in your account so the app can learn what
          you say often and surface those phrases faster over time. This
          data is yours. You can delete it at any time by deleting your
          account (see below).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          Photos (camera feature)
        </h3>
        <p className="mb-4 leading-relaxed">
          If you use the camera to identify an object, the photo is sent to
          Anthropic Claude for visual recognition. The photo is not stored
          on our servers — only the identified label (e.g., &quot;coffee
          cup&quot;) is returned to the app and added to your phrase.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Third parties we share data with
        </h2>
        <p className="mb-4 leading-relaxed">
          Dare Vocem uses these services to function. We do not share data
          with anyone else.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 leading-relaxed">
          <li>
            <strong>Supabase</strong> (database + authentication) — stores
            your account, saved phrases, and usage patterns. Hosted on
            servers in the US.
          </li>
          <li>
            <strong>Anthropic (Claude API)</strong> — receives the text of
            sentences you are composing to predict the next word. Anthropic
            does not use customer API data to train models.
          </li>
          <li>
            <strong>ElevenLabs</strong> — receives the final composed
            phrase to generate speech audio. If your voice has been cloned,
            ElevenLabs stores the voice model on their servers. You can
            request voice deletion through their privacy controls.
          </li>
          <li>
            <strong>Apple / Google</strong> — handle sign-in authentication.
            They confirm your identity to the app but do not see app
            content.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Voice cloning</h2>
        <p className="mb-6 leading-relaxed">
          If a cloned voice is set up for your account, the underlying voice
          model is stored at ElevenLabs and can only be used by your
          account. Voice samples used to create the clone are not stored in
          Dare Vocem after the clone is created. You can request deletion of
          the voice clone by contacting us; we will issue the deletion
          request to ElevenLabs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Data retention and deletion
        </h2>
        <p className="mb-6 leading-relaxed">
          Your data is retained as long as your account exists. To delete
          your account and all associated data, email{" "}
          <a href="mailto:zkhowes@gmail.com" className="underline">
            zkhowes@gmail.com
          </a>{" "}
          from the email address linked to your account. Deletion is
          permanent and typically completes within seven days.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Children and vulnerable users
        </h2>
        <p className="mb-6 leading-relaxed">
          Dare Vocem is designed for adults with communication impairments.
          The app is not directed at children under 13. If an account is
          managed on behalf of a user with a cognitive impairment, a
          caregiver may request data access or deletion using the email
          address above.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Security
        </h2>
        <p className="mb-6 leading-relaxed">
          All data in transit is encrypted via HTTPS. Data at rest is stored
          in Supabase&apos;s managed infrastructure with row-level security
          policies that prevent users from accessing other accounts&apos;
          data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Changes to this policy
        </h2>
        <p className="mb-6 leading-relaxed">
          When this policy changes materially, the &quot;Last updated&quot;
          date above will change and the app will surface a notification on
          next launch.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="mb-6 leading-relaxed">
          Questions, deletion requests, or anything else:{" "}
          <a href="mailto:zkhowes@gmail.com" className="underline">
            zkhowes@gmail.com
          </a>
          .
        </p>
      </section>
      <Footer />
    </>
  );
}
