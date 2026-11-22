import { H, P, PolicyPage, SiteLink } from "../components/policy/PolicyUi.jsx";

function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" crumb="Privacy" wide>
      <H>Aggregate Information (non-personally identifiable)</H>
      <P>
        <SiteLink /> (A Unit of Gift22 Inc wineandchampagnegifts.com) respects each individual user&apos;s right to
        privacy. We do not collect personal identifying information unless such information is specifically and
        knowingly provided from users during contests, site registration, or for shipping and delivery.
      </P>

      <H>Registration</H>
      <P>No registration is required in order to use this website.</P>

      <H>Third-Party Offers or Mailing Lists</H>
      <P>
        You may receive information regarding products, new features, services newsletters (ours or a third
        party&apos;s), and special offers we think you&apos;ll find valuable. We may also share information with very
        few selected business partners.
      </P>

      <H>Security</H>
      <P>
        We take decent precautions to keep the personal information disclosed to us secure. However, we are not
        responsible for any breach of security.
      </P>

      <H>Cookies</H>
      <P>
        Non-personal information and data may be automatically collected through the standard operation of our
        website servers (i.e. log file information like IP address) or through the use of &quot;cookies.&quot;
        Cookies are small text files that our site places on your computer&apos;s hard drive to recognize repeat
        users and facilitate the user&apos;s use of the site. Also, our cookies allow a site to track usage behavior
        and compile aggregate data for content improvement, targeted advertising, and marketing and promotional
        purposes.
      </P>

      <H>ATTENTION KIDS!</H>
      <P bold>
        No information should be submitted to our website by children under 21 years of age without their
        parent&apos;s or guardian&apos;s consent. We do not monitor the age of its user audience. We do not sell or
        deliver to anyone under 21 and we require a valid id while picking up an order or receiving a delivery.
      </P>

      <H>Right to Change at Any Time</H>
      <P>
        <SiteLink /> reserves the right to change this policy at any time by posting notice of a new privacy
        statement. This statement and the policies outlined herein are not intended to and do not create any
        contractual or other legal rights in or on behalf of any party.
      </P>

      <P>
        <strong>Note:</strong> In the event that there is a seasonal shortage of any item(s), an item(s) of equal or
        greater value will be replaced.
      </P>
    </PolicyPage>
  );
}

export default PrivacyPolicy;
