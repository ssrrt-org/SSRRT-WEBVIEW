import { Link } from 'react-router-dom';
import { Eyebrow, SlimHead, Split, Quote, Stats } from '@/components/shared/PageSections';
import ExploreGrid from '@/components/shared/ExploreGrid';
import HashRedirect from '@/components/shared/HashRedirect';
import { goshalaCows } from '@/constants/cowGallery';
import { usePageImages } from '@/context/CmsContext';
import { IMG } from '@/constants/images';
import { ArrowUpRight } from 'lucide-react';

export default function GoshalaPage() {
  const img = usePageImages("/goshala");
  const cows = goshalaCows.map((cow) => ({
    ...cow,
    image: img(`gallery-${cow.id}`, cow.image),
  }));

  return (
  <>
    <HashRedirect basePath="/goshala" ids={["adopt", "day"]} />

    <SlimHead
      eyebrow="Kaamadhenau · Gau Seva"
      title="Every cow known, named, and loved."
    />

    <Stats items={[
      { value: "300+", label: "Cows, bulls & calves" },
      { value: "80", label: "Calves growing up" },
      { value: "20 yrs", label: "Unbroken service" },
      { value: "0", label: "Bulls ever to slaughter" },
    ]}/>

    <Split eyebrow="Gaumata · The universal mother" title="A second mother to humanity." image={img("split-gaumata", IMG.cow1)}>
      <p>In Sanskrit the cow is called <em>Gaumata</em> — cow mother. It is not a metaphor. Every human being receives nourishment first from their own mother's milk. For billions of people, the next source of vital nourishment has been the milk of a cow. Calcium for bones. Protein for muscles. Fats for developing brains. The cow, in a very real physical sense, has mothered humanity.</p>
      <p>The Rigveda calls her <em>Aghnya</em> — that which must not be killed. In the Mahabharata it is said that wherever the cow is protected and honoured, dharma flourishes. Lord Krishna himself spent his childhood as a cowherd, and is known as Govinda — the one who brings joy to cows.</p>
    </Split>

    <Split eyebrow="Kamadhenu · The wish-fulfilling cow" title="Abundance made gentle." image={img("split-kamadhenu", IMG.calf)} reverse tint>
      <p>The name <em>Kaamadhenau</em> is drawn from Kamadhenu — the celestial cow who emerged from the churning of the cosmic ocean, and who has the power to grant any wish, fulfil any need, nourish any prayer. She is abundance itself. She is the generosity of the divine made manifest in a gentle, giving creature.</p>
      <p>To name a Goshala after Kamadhenu is to declare its highest aspiration: that this place of animal care should itself become a source of abundance — of nutrition, of spiritual merit, of ecological healing, of love freely given. And in two decades, that is precisely what Project Kaamadhenau has become.</p>
    </Split>

    <Quote author="Amma">The cow is our mother. She nourishes us as we grow. Protecting her is not tradition — it is gratitude.</Quote>

    <section className="cow-gallery">
      <div className="wrap">
        <Eyebrow gold>Project Kaamadhenau</Eyebrow>
        <h2 className="section-h">Faces of the Goshala.</h2>
        <p className="cow-gallery-lede">Real photographs from the Ashram grounds — mothers, calves, feeding lines, and the quiet companionship of a herd that is known, named, and loved.</p>
        <div className="cow-gallery-grid">
          {cows.map((cow) => (
            <figure key={cow.id} className="cow-card" data-testid={`goshala-cow-${cow.id}`}>
              <div className="cow-card-img">
                <img src={cow.image} alt={cow.alt} loading="lazy" />
              </div>
              <figcaption className="cow-card-body">
                <span className="cow-card-type">{cow.type}</span>
                <h3>{cow.name}</h3>
                <p>{cow.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="cow-gallery-cta">
          <p>Every sponsorship helps feed, shelter, and care for lives like these.</p>
          <Link className="btn-solid" data-testid="goshala-gallery-adopt" to="/donate?purpose=goshala">
            Support the Goshala <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    <section className="three-lives">
      <div className="wrap">
        <Eyebrow>Every life honoured</Eyebrow>
        <h2 className="section-h">The animals of Kaamadhenau.</h2>
        <div className="three-lives-grid">
          <article>
            <div className="tl-img"><img src={img("three-lives-cows", IMG.cow4)} alt="Gir cows at the Goshala"/></div>
            <div className="tl-body">
              <h3>The Cows</h3>
              <p>Indigenous breeds — Gir, Sahiwal, Tharparkar — exquisitely adapted to Indian soil and climate. Their milk carries A2 beta-casein, associated with easier digestion and better nutrition. The Ashram uses what is needed for cooking and ritual; the rest reaches milk centres in surrounding villages.</p>
            </div>
          </article>
          <article>
            <div className="tl-img"><img src={img("three-lives-bulls", IMG.cow2)} alt="Bulls protected in the sanctuary"/></div>
            <div className="tl-body">
              <h3>The Bulls</h3>
              <p>Perhaps the most counter-cultural commitment of the Goshala. Bulls produce no milk and, in the prevailing economy, are typically sold to slaughter. Not here. Every bull lives out his full natural life within the Ashram's care — as Nandi, as a symbol of strength and faithfulness, as a beloved being.</p>
            </div>
          </article>
          <article>
            <div className="tl-img"><img src={img("three-lives-calves", IMG.cow6)} alt="A young calf at the sanctuary"/></div>
            <div className="tl-body">
              <h3>The Calves</h3>
              <p>About 80 calves — the next generation. Never separated from their mothers prematurely. Given their mother's milk, monitored closely, vaccinated, dewormed, and allowed to play on organic grass fields grown just for them. The joy of the Goshala's mornings.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="sustain tint">
      <div className="wrap">
        <Eyebrow gold>World-class infrastructure</Eyebrow>
        <h2 className="section-h">A home worthy of the sacred.</h2>
        <div className="sustain-grid">
          <article><h3>Shelters built for wellbeing</h3><p>Spacious, well-ventilated structures. Mounted fans for the peak summer months. Complete monsoon protection. Drainage that keeps sleeping areas dry. Animals free to choose their spot — shade, breeze, company or solitude.</p></article>
          <article><h3>Exceptional nutrition</h3><p>Fresh organic green fodder, dried roughage, concentrated feed with grains and pulses, mineral supplements and clean water at all times. Pregnant cows, nursing mothers, calves and elderly animals each receive individualised diets.</p></article>
          <article><h3>Organic grass fields</h3><p>Cultivated on the Ashram's own land to supply daily fresh fodder — cutting dependence on purchased feed. Managed with organic methods that enrich the soil year on year.</p></article>
          <article><h3>Clean, purposeful waste flow</h3><p>Shelters cleaned on a rigorous schedule. Waste collected, channelled and processed to prevent pathogens, minimise odour and keep the environment genuinely pleasant.</p></article>
          <article><h3>Biogas programme</h3><p>A planned system that will turn cow dung into clean cooking gas and electricity for the Ashram. Reduces LPG dependence and closes the ecological loop.</p></article>
          <article><h3>Zero-waste circular loop</h3><p>Cows produce dung → dung becomes biogas + fertiliser → fertiliser grows the grass → grass feeds the cows. A model the ancient rishis lived, and modern sustainability urgently seeks.</p></article>
        </div>
      </div>
    </section>

    <ExploreGrid
      title="Also on the Goshala"
      items={[
        { to: "/goshala/adopt", title: "Adopt a cow", note: "Sponsor feed and care for one animal", testid: "goshala-link-adopt" },
        { to: "/goshala/day", title: "A day at Kaamadhenau", note: "Morning feeding through evening rest", testid: "goshala-link-day" },
        { to: "/volunteering", title: "Volunteer", note: "Feeding, grooming, calf care", testid: "goshala-link-volunteer" },
        { to: "/donate?purpose=goshala", title: "Donate to the Goshala", testid: "goshala-link-donate" },
      ]}
    />

    <section className="world-context tint">
      <div className="wrap world-context-grid">
        <div>
          <Eyebrow gold>Context</Eyebrow>
          <h2>Why the Goshala matters.</h2>
          <p>Roughly one billion cattle exist on earth at any moment, and approximately 300 million are slaughtered every year. Industrial dairy routinely separates calves from mothers within hours. Male calves are treated as byproducts. Cattle agriculture drives around 14.5% of global greenhouse emissions and is a primary driver of deforestation.</p>
          <p>Kaamadhenau is not a rebuttal in words. It is a working demonstration — twenty years and counting — that a large herd can be cared for ethically, sustainably and joyfully. Every bull who grazes here is a life actively saved. Every calf who nurses freely at his mother's side is a relationship the world so often severs — allowed to unfold as nature intended.</p>
        </div>
        <ul className="wc-facts">
          <li><strong>0</strong><span>Bulls sent to slaughter, ever</span></li>
          <li><strong>A2</strong><span>Beta-casein milk from indigenous breeds</span></li>
          <li><strong>100%</strong><span>Organic green fodder from Ashram fields</span></li>
          <li><strong>365</strong><span>Days of continuous, individualised care</span></li>
        </ul>
      </div>
    </section>

    <section id="history" className="journey">
      <div className="wrap">
        <Eyebrow gold>History of the Goshala</Eyebrow>
        <h2 className="section-h">From two cows, to a family of three hundred.</h2>
        <div className="journey-timeline">
          <article>
            <div className="j-year">Beginning · ~20 yrs ago</div>
            <h3>Two cows, and a covenant</h3>
            <p>A modest start — two animals, a small shelter, a handful of devoted caregivers, an enormous amount of love. Animated from the first day by a promise: here, no animal will be discarded. Every bull, every calf, every cow will live out their natural life in dignity.</p>
          </article>
          <article>
            <div className="j-year">Growth · sustained care</div>
            <h3>The community expands</h3>
            <p>Through the generosity of devotees, the unglamorous daily work of staff, and Amma's guiding vision, the herd steadily grew. Rescued cows arrived from roadsides, from farms that could no longer keep them, from situations of neglect.</p>
          </article>
          <article>
            <div className="j-year">Today · 300+ souls</div>
            <h3>A vibrant, beloved community</h3>
            <p>More than 300 cows, bulls and approximately 80 calves. Indigenous breeds — Gir, Sahiwal, Tharparkar — producing A2 milk of exceptional quality. Bulls fully protected. Zero sent to slaughter.</p>
          </article>
          <article>
            <div className="j-year">Tomorrow · self-sufficient</div>
            <h3>A closed, ecological loop</h3>
            <p>A biogas programme to turn cow dung into clean cooking gas and electricity for the Ashram. Composted remainder returns to the soil to grow the grass that feeds the herd. A model of circular agriculture — ancient wisdom, modern outcome.</p>
          </article>
        </div>
      </div>
    </section>
  </>
);
}
