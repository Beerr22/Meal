import { useState } from "react";

const HP = { name:"Husband", short:"HUSBAND", emoji:"💪", color:"#60caff", bg:"rgba(96,202,255,0.08)", border:"rgba(96,202,255,0.28)", stats:"6′6″ · 240 lbs · Lifts 3×/wk · Sedentary", goal:"Lose 10 lbs · Preserve muscle", health:"Chol 240 · Trig 300", targets:{ cal:2400, pro:200, fat:155, chol:220 } };
const WP = { name:"Wife", short:"WIFE", emoji:"🏃‍♀️", color:"#fb923c", bg:"rgba(251,146,60,0.08)", border:"rgba(251,146,60,0.28)", stats:"5′4″ · 130 lbs · Cardio + Strength 4×/wk", goal:"Lean & strong", health:"Active · <300mg chol", targets:{ cal:1800, pro:130, fat:118, chol:300 } };
const DT = {
  tofu:   { emoji:"🌿", color:"#a78bfa", bg:"rgba(167,139,250,0.1)", label:"TOFU" },
  salmon: { emoji:"🐟", color:"#f97316", bg:"rgba(249,115,22,0.1)",  label:"SALMON" },
  cod:    { emoji:"🐠", color:"#22d3ee", bg:"rgba(34,211,238,0.1)",  label:"COD" },
};

const SHOPPING_LIST = [
  { cat:"🍎 Fruit", items:["Bananas, 5 medium (husband Mon–Fri morning shake)"]},
  { cat:"🥬 Fresh Vegetables", items:[
    "Cauliflower, 2 large heads","Broccoli, 2 large heads","Brussels sprouts, 18oz","Asparagus, 2 bunches","Zucchini, 2 medium (for Med base)","Cucumber, 3 medium","Bell peppers, 4 red total","Avocados, 10–12","Cherry tomatoes, 3 bags (~70g × 3)","Red onion, 1","Garlic, 3 cloves","Mixed greens, 500g","Spinach, 100g baby","Mushrooms, 150g","Fresh parsley, 1 bunch","Fresh dill, 1 bunch","Fresh thyme, small bunch","Fresh ginger, small knob","Fresh basil, small bunch","Fresh chives, small bunch",
  ]},
  { cat:"🥫 Canned", items:[
    "Albacore tuna, 3 × 5oz cans","Wild salmon, 2 × 5oz cans","Kalamata olives, 1 × 100g jar",
  ]},
  { cat:"🥩 Meat & Poultry", items:[
    "Chicken breast, ~2.2 lbs / 7 pieces · 5oz every day",
  ]},
  { cat:"🐟 Fish", items:[
    "Salmon fillet, 24oz total (4 × 6oz — Tue × 2 + Sat × 2)","Cod fillet, 12oz total (7oz husband + 5oz wife · Fri)","Tilapia fillet, 6oz (Sat lunch · wife)",
  ]},
  { cat:"🌿 Plant Protein", items:[
    "Tofu, 6 × 14oz packs firm",
  ]},
  { cat:"🥛 Dairy & Eggs", items:[
    "Liquid egg whites, 2 cartons (500ml each)","Unsweetened almond milk, 80 fl oz","Cottage cheese, ~4 lbs","Pistachios, 150g","Chobani 20G Cherry Berry, 5 containers","Reduced-fat feta, small amount",
  ]},
];

const BASES = [
  { key:"ratatouille", when:"SUNDAY", label:"LUNCH BASE — Husband Mon–Fri", tagColor:"#f87171", tagBg:"rgba(248,113,113,0.1)", icon:"🫕", name:"Provençal Ratatouille", prepTime:"15 min prep · 7–8 hrs LOW · 5 servings", note:"100% plant-based. Zero cholesterol.", ingredients:["2 large eggplants, cubed 1-inch","4 medium zucchini, half-moons","3 bell peppers, diced","2 × 14oz cans crushed tomatoes (no-salt)","2 large onions, diced","6 garlic cloves, minced","4 tbsp avocado oil","2 tsp herbes de Provence · 1 tsp smoked paprika · 1 tsp thyme","Fresh basil · sea salt · black pepper"], steps:["Layer eggplant and zucchini in slow cooker with half the avocado oil.","Add peppers, onions, garlic, tomatoes and remaining avocado oil. Stir.","Season with all spices.","Cook LOW 7–8 hrs. Stir once halfway if home.","Cool fully. Store in 1 glass container.","Microwave 90 sec per serving then top with chicken."], storage:"1 glass container · Fridge 5 days" },
  { key:"cruciferous", when:"SUNDAY", label:"DINNER BASE — Both · Mon–Fri nights", tagColor:"#4ade80", tagBg:"rgba(74,222,128,0.1)", icon:"✈️", name:"Roasted Cruciferous Medley", prepTime:"Prep Sun · Air fry fresh before each meal · 10 servings", note:"Zero cholesterol. Wash and cut Sunday. Air fry 400°F · 12–14 min fresh before each dinner.", ingredients:["2 large heads cauliflower, florets","2 large heads broccoli, florets","18oz Brussels sprouts, trimmed & halved","2 bunches asparagus, woody ends snapped","5 tbsp avocado oil","2 tsp garlic powder · 1 tsp smoked paprika · 1 tsp onion powder","½ tsp chili flakes · sea salt · black pepper"], steps:["SUNDAY: Wash and cut all vegetables. Store raw in large containers in fridge.","EACH DINNER NIGHT: Toss 150g with 1 tbsp avocado oil and spices.","Air fry at 400°F · 12–14 min · shake halfway.","Plate immediately with protein."], storage:"Fridge 5 days · Air fry fresh before each meal" },
  { key:"mediterranean", when:"SATURDAY MORNING", label:"WEEKEND DINNER BASE — Sat & Sun nights", tagColor:"#fbbf24", tagBg:"rgba(251,191,36,0.1)", icon:"🌊", name:"Roasted Mediterranean Vegetables", prepTime:"15 min prep · 2 batches · ~30 min · 4 servings", note:"Olives, cherry tomatoes, eggplant and oregano. Zero cholesterol.", ingredients:["2 medium zucchini, half-moons","1 large eggplant, cubed 1-inch","2 red bell peppers, strips","1 large red onion, wedges","300g cherry tomatoes, halved","100g Kalamata olives, pitted","3 garlic cloves, minced","3 tbsp avocado oil","1 tsp dried oregano · 1 tsp dried thyme · ½ tsp garlic powder","Sea salt · cracked black pepper"], steps:["Toss all veg (except olives) with avocado oil and spices.","Air fry in 2 batches at 400°F · 12 min each · shake halfway.","Add olives in the last 3 min only — they burn quickly.","Cool on a tray. Store in 1 glass container.","Reheat: 380°F · 4 min or microwave 60 sec."], storage:"1 container · Fridge 3 days · Covers both Sat & Sun dinners" },
];

const H_WD_BFAST = { name:"Garden of Life Shake · Banana · Chobani 20G", noCook:true, locked:true, detail:"3 scoops Garden of Life Organic Protein+Greens + 16 fl oz unsweetened almond milk + 1 tbsp chia seeds + 1 medium banana · Chobani 20G Cherry Berry", cal:735, pro:85, fat:17, chol:15 };
const W_WD_BFAST = { name:"Chobani 20G · Almonds · Chia Seeds", noCook:true, locked:true, detail:"Chobani 20G Cherry Berry + 20g almonds + 1 tbsp chia seeds", cal:325, pro:26, fat:16, chol:15 };

const DAYS = [
  {
    day:"MON", full:"Monday", isWeekend:false, color:"#60caff",
    dinner:{ type:"tofu", label:"Garlic-Soy & Sesame", sauce:"3 tbsp low-sodium tamari · 3 garlic cloves minced · 1 tsp fresh ginger grated · 1 tsp sesame oil · 1 tbsp rice vinegar · ¼ tsp chili flakes" },
    heartNote:"Tofu night = 0mg chol at dinner. Animal Whey adds 60mg at snack — Mon lands at 203mg, well under cap.",
    meals:{
      breakfast:{ H:H_WD_BFAST, W:W_WD_BFAST },
      lunch:{
        H:{ base:true, detail:"150g ratatouille base + 5oz chicken breast", cal:308, pro:47, fat:8, chol:110 },
        W:{ salad:true, eggDay:false, detail:"100g mixed greens · 80g cucumber · 70g cherry tomatoes · 1 can (5oz) albacore tuna · ½ avocado", cal:490, pro:38, fat:26, chol:55 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 45g almonds + 40g hazelnuts", cal:815, pro:58, fat:47, chol:78 },
        W:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 30g pistachios", cal:514, pro:50, fat:17, chol:65 },
      },
      dinner:{
        prep:"Press tofu 15 min · Air Fryer 400°F · 18–20 min · flip halfway · brush sauce last 5 min",
        H:{ detail:"14oz firm tofu (full pack) + 150g cruciferous medley + ½ avocado", cal:530, pro:38, fat:29, chol:0 },
        W:{ detail:"14oz firm tofu (full pack) + 150g cruciferous medley + ½ avocado", cal:660, pro:38, fat:43, chol:0 },
      },
    },
    totals:{ H:{ cal:2388, pro:228, fat:85, chol:203 }, W:{ cal:1989, pro:152, fat:102, chol:135 } },
  },
  {
    day:"TUE", full:"Tuesday", isWeekend:false, color:"#2eefb0",
    dinner:{ type:"salmon", label:"Lemon-Dill", sauce:"Lemon zest · fresh dill · garlic · sea salt · cracked black pepper" },
    heartNote:"Salmon + Animal Whey = tighter chol day. Chicken trimmed at lunch — lands at 217mg safely under cap.",
    meals:{
      breakfast:{ H:H_WD_BFAST, W:W_WD_BFAST },
      lunch:{
        H:{ base:true, detail:"150g ratatouille base + 5oz chicken breast", cal:308, pro:47, fat:8, chol:110 },
        W:{ salad:true, eggDay:false, detail:"100g mixed greens · 80g cucumber · 70g cherry tomatoes · 1 can (5oz) albacore tuna · ½ avocado", cal:370, pro:32, fat:16, chol:55 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 45g almonds + 40g hazelnuts", cal:815, pro:58, fat:47, chol:78 },
        W:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 30g pistachios", cal:514, pro:50, fat:17, chol:65 },
      },
      dinner:{
        prep:"Air Fryer 400°F · 10–12 min · FULLY SHARED same basket",
        H:{ detail:"6oz salmon fillet + 150g cruciferous medley + ½ avocado", cal:549, pro:40, fat:35, chol:107 },
        W:{ detail:"6oz salmon fillet + 150g cruciferous medley + ½ avocado", cal:649, pro:40, fat:47, chol:107 },
      },
    },
    totals:{ H:{ cal:2407, pro:230, fat:90, chol:310 }, W:{ cal:1858, pro:148, fat:79, chol:242 } },
  },
  {
    day:"WED", full:"Wednesday", isWeekend:false, color:"#c4a8ff",
    dinner:{ type:"tofu", label:"Smoked Paprika & Lemon", sauce:"1 tsp smoked paprika · zest + 1 tbsp juice of 1 lemon · ½ tsp garlic powder · 2 tbsp fresh parsley chopped · sea salt" },
    heartNote:"Back to tofu — 0mg chol at dinner. Animal Whey adds 60mg at snack, total stays at 203mg.",
    meals:{
      breakfast:{ H:H_WD_BFAST, W:W_WD_BFAST },
      lunch:{
        H:{ base:true, detail:"150g ratatouille base + 5oz chicken breast", cal:308, pro:47, fat:8, chol:110 },
        W:{ salad:true, eggDay:false, detail:"100g mixed greens · 80g cucumber · 60g red pepper · 1 can (5oz) wild salmon · ½ avocado", cal:500, pro:35, fat:30, chol:65 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 45g almonds + 40g hazelnuts", cal:815, pro:58, fat:47, chol:78 },
        W:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 30g pistachios", cal:514, pro:50, fat:17, chol:65 },
      },
      dinner:{
        prep:"Press tofu 15 min · Air Fryer 400°F · 18–20 min · paprika-lemon rub",
        H:{ detail:"14oz firm tofu (full pack) + 150g cruciferous medley + ½ avocado", cal:530, pro:38, fat:29, chol:0 },
        W:{ detail:"14oz firm tofu (full pack) + 150g cruciferous medley + ½ avocado", cal:660, pro:38, fat:43, chol:0 },
      },
    },
    totals:{ H:{ cal:2388, pro:228, fat:85, chol:203 }, W:{ cal:1999, pro:149, fat:106, chol:145 } },
  },
  {
    day:"THU", full:"Thursday", isWeekend:false, color:"#fb923c",
    dinner:{ type:"cod", label:"Lemon-Caper", sauce:"Lemon juice & zest · capers · garlic · fresh parsley · 1.5 tbsp avocado oil" },
    heartNote:"Cod night — switched from Friday. 5oz chicken + cod + Animal Whey = 302mg chol. Strong protein at 240g.",
    meals:{
      breakfast:{ H:H_WD_BFAST, W:W_WD_BFAST },
      lunch:{
        H:{ base:true, detail:"150g ratatouille base + 5oz chicken breast", cal:308, pro:47, fat:8, chol:110 },
        W:{ salad:true, eggDay:false, detail:"100g mixed greens · 80g cucumber · 70g cherry tomatoes · 1 can (5oz) wild salmon · ½ avocado", cal:510, pro:32, fat:34, chol:75 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 45g almonds + 40g hazelnuts", cal:815, pro:58, fat:47, chol:78 },
        W:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 30g pistachios", cal:514, pro:50, fat:17, chol:65 },
      },
      dinner:{
        prep:"Air Fryer 400°F · 10–12 min · FULLY SHARED same basket",
        H:{ detail:"7oz cod fillet + 150g cruciferous medley + ½ avocado", cal:475, pro:50, fat:17, chol:99 },
        W:{ detail:"5oz cod fillet + 150g cruciferous medley + ½ avocado", cal:565, pro:31, fat:41, chol:71 },
      },
    },
    totals:{ H:{ cal:2333, pro:240, fat:80, chol:302 }, W:{ cal:1989, pro:144, fat:100, chol:295 } },
  },
  {
    day:"FRI", full:"Friday", isWeekend:false, color:"#f472b6",
    dinner:{ type:"tofu", label:"Cajun-Spiced", sauce:"1 tsp smoked paprika · ¼ tsp cayenne · ½ tsp dried oregano · ½ tsp dried thyme · ½ tsp garlic powder · ½ tsp onion powder" },
    heartNote:"Tofu night — switched from Thursday. 0mg chol at dinner. 203mg total — well under cap.",
    meals:{
      breakfast:{ H:H_WD_BFAST, W:W_WD_BFAST },
      lunch:{
        H:{ base:true, detail:"150g ratatouille base + 5oz chicken breast", cal:308, pro:47, fat:8, chol:110 },
        W:{ salad:true, eggDay:true, detail:"🥚 EGG DAY — 100g mixed greens · 1 boiled egg · ½ avocado · 60g cherry tomatoes · small amount reduced-fat feta", cal:340, pro:10, fat:22, chol:200 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 45g almonds + 40g hazelnuts", cal:815, pro:58, fat:47, chol:78 },
        W:{ detail:"200g cottage cheese + 1 scoop Animal Whey (chocolate) + 30g pistachios + Chobani 20G Cherry Berry", cal:664, pro:70, fat:19, chol:80 },
      },
      dinner:{
        prep:"Press tofu 15 min · Air Fryer 400°F · 18–20 min · generous Cajun rub",
        H:{ detail:"14oz firm tofu (full pack) + 150g cruciferous medley + ½ avocado", cal:530, pro:38, fat:29, chol:0 },
        W:{ detail:"14oz firm tofu (full pack) + 150g cruciferous medley + ½ avocado", cal:660, pro:38, fat:43, chol:0 },
      },
    },
    totals:{ H:{ cal:2388, pro:228, fat:85, chol:203 }, W:{ cal:1914, pro:139, fat:108, chol:226 } },
  },
  {
    day:"SAT", full:"Saturday", isWeekend:true, color:"#f97316",
    dinner:{ type:"salmon", label:"Garlic-Herb", sauce:"Garlic · fresh parsley & thyme · lemon zest · sea salt" },
    heartNote:"Shared egg white omelette. GoL shake at snack. 5oz chicken at lunch. 222g protein · 211mg chol ✅",
    meals:{
      breakfast:{
        name:"Shared Egg White Omelette · Mushrooms · Spinach · Avocado",
        prep:"Stovetop · 15 min · make one large omelette together and split it",
        base:"150g mushrooms · 100g baby spinach · 100g cherry tomatoes · · sea salt · black pepper",
        H:{ cookNote:"⏱ Stovetop · split from shared omelette", detail:"1½ cups liquid egg whites + ½ avocado\n3 scoops GoL + 8 fl oz almond milk", cal:690, pro:86, fat:20, chol:0 },
        W:{ cookNote:"⏱ Stovetop · split from shared omelette", detail:"1 cup liquid egg whites + ½ avocado", cal:240, pro:18, fat:16, chol:0 },
      },
      lunch:{
        H:{ cookNote:"⏱ Air Fryer 400°F · 14 min", detail:"5oz chicken breast (lemon-herb rub) + 200g air-fried mushrooms & peppers + ½ avocado", cal:347, pro:45, fat:17, chol:86 },
        W:{ cookNote:"⏱ Air Fryer 400°F · 10 min", detail:"6oz tilapia fillet (smoked paprika & lime) + 200g air-fried mushrooms & peppers + ½ avocado", cal:450, pro:38, fat:28, chol:85 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop GoL + 20g almonds + 60g hazelnuts", cal:807, pro:56, fat:71, chol:18 },
        W:{ detail:"200g cottage cheese + 1 scoop GoL + 8 fl oz almond milk + 30g almonds", cal:484, pro:50, fat:12, chol:9 },
      },
      dinner:{
        prep:"Air Fryer 400°F · 10–12 min · FULLY SHARED · Mediterranean base prepared Saturday morning",
        H:{ detail:"6oz salmon fillet + 150g Mediterranean veg base + ½ avocado", cal:549, pro:35, fat:33, chol:107 },
        W:{ detail:"6oz salmon fillet + 150g Mediterranean veg base + ½ avocado", cal:649, pro:35, fat:45, chol:89 },
      },
    },
    totals:{ H:{ cal:2393, pro:222, fat:111, chol:211 }, W:{ cal:1823, pro:141, fat:104, chol:183 } },
  },
  {
    day:"SUN", full:"Sunday", isWeekend:true, color:"#e05555",
    dinner:{ type:"tofu", label:"Ginger-Miso Glaze", sauce:"2 tbsp white miso · 1 tsp fresh ginger grated · 2 garlic cloves minced · 1 tsp sesame oil · 1 tbsp rice vinegar · juice of ½ lime — brush on last 5 min" },
    heartNote:"Shared egg white omelette. GoL shake at snack. 5oz chicken at lunch. 224g protein · 104mg chol ✅",
    meals:{
      breakfast:{
        name:"Shared Egg White Omelette · Peppers · Zucchini · Mushrooms · Avocado",
        prep:"Stovetop · 15 min · make one large omelette together and split it",
        base:"100g zucchini · 80g mixed peppers · 80g onion · 80g mushrooms · · everything bagel seasoning",
        H:{ cookNote:"⏱ Stovetop · split from shared omelette", detail:"1½ cups liquid egg whites + ½ avocado\n3 scoops GoL + 8 fl oz almond milk", cal:690, pro:86, fat:20, chol:0 },
        W:{ cookNote:"⏱ Stovetop · split from shared omelette", detail:"1 cup liquid egg whites + ½ avocado", cal:240, pro:18, fat:16, chol:0 },
      },
      lunch:{
        H:{ cookNote:"⏱ Air Fryer 400°F · 14 min", detail:"5oz chicken breast (rosemary & garlic) + 200g air-fried mushrooms & peppers + ½ avocado", cal:313, pro:45, fat:11, chol:86 },
        W:{ cookNote:"⏱ Stovetop · 8 min", detail:"1 cup liquid egg whites (frittata style) + 200g air-fried mushrooms & peppers + ½ avocado", cal:350, pro:26, fat:16, chol:0 },
      },
      snacks:{
        H:{ detail:"200g cottage cheese + 1 scoop GoL + 30g almonds + 60g hazelnuts", cal:865, pro:58, fat:73, chol:18 },
        W:{ detail:"200g cottage cheese + 1 scoop GoL + 8 fl oz almond milk + 30g almonds", cal:484, pro:50, fat:12, chol:9 },
      },
      dinner:{
        prep:"Press tofu 15 min · Air Fryer 400°F · 18–20 min · brush miso glaze last 5 min",
        H:{ detail:"14oz firm tofu (full pack) + 150g Mediterranean veg base + ½ avocado", cal:508, pro:32, fat:29, chol:0 },
        W:{ detail:"14oz firm tofu (full pack) + 150g Mediterranean veg base + ½ avocado", cal:660, pro:38, fat:43, chol:0 },
      },
    },
    totals:{ H:{ cal:2376, pro:221, fat:110, chol:104 }, W:{ cal:1734, pro:132, fat:89, chol:9 } },
  },
];

const avgHChol = Math.round(DAYS.reduce((s,d)=>s+d.totals.H.chol,0)/7);

export default function MealPlan() {
  const [tab, setTab] = useState("prep");
  const [openPrep, setOpenPrep] = useState({});
  const [openIngredients, setOpenIngredients] = useState({ shopping:false });
  const togglePrep = key => setOpenPrep(p=>({...p,[key]:!p[key]}));

  const cholColor = v => {
    if (v <= 150) return "#4ade80";
    if (v <= 220) return "#fbbf24";
    if (v <= 260) return "#f97316";
    return "#ef4444";
  };

  const Bar = ({ label, val, target, color, unit="g", isChol=false }) => {
    const pct = target ? Math.min((val/target)*100,100) : 50;
    const c = isChol ? cholColor(val) : color;
    return (
      <div style={{marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
          <span style={{color:"#cbd5e1",fontWeight:600}}>{label}</span>
          <span style={{fontWeight:800,fontSize:12,color:isChol?cholColor(val):"#e2e8f0"}}>
            {val}{unit}{target&&<span style={{color:"#cbd5e1",fontWeight:400}}> / {target}{unit}</span>}
          </span>
        </div>
        <div style={{height:5,background:"#1e293b",borderRadius:8}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${c}44,${c})`,borderRadius:8}}/>
        </div>
      </div>
    );
  };

  const MacroGrid = ({ cal, pro, fat, chol, accentColor, isH }) => (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(36px,1fr))",gap:4}}>
      {[["🔥",cal,"kcal",false],["🥩",pro+"g","prot",false],["🫒",fat+"g","fat",false],["❤️",chol+"mg","chol",true]].map(([icon,val,lbl,isCh])=>(
        <div key={lbl} style={{background:"rgba(0,0,0,0.32)",borderRadius:7,padding:"6px 3px 5px",textAlign:"center",border:`1px solid ${isCh&&isH?`${cholColor(chol)}33`:"transparent"}`,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <div style={{fontSize:10,lineHeight:1}}>{icon}</div>
          <div style={{fontWeight:800,fontSize:11,color:isCh&&isH?cholColor(chol):accentColor,lineHeight:1.2}}>{val}</div>
          <div style={{color:"#94a3b8",fontSize:8,textTransform:"uppercase",letterSpacing:.3,lineHeight:1}}>{lbl}</div>
        </div>
      ))}
    </div>
  );

  const PersonCard = ({ profile, data, isH, extraLabel }) => (
    <div style={{flex:1,minWidth:0,background:profile.bg,border:`1px solid ${profile.border}`,borderRadius:10,padding:12,display:"flex",flexDirection:"column"}}>
      <div style={{fontSize:10,fontWeight:900,color:profile.color,letterSpacing:.8,textTransform:"uppercase",marginBottom:4}}>{profile.emoji} {profile.short}{extraLabel?` · ${extraLabel}`:""}</div>
      {data.cookNote&&<div style={{fontSize:10,color:"#94a3b8",marginBottom:5,fontStyle:"italic"}}>{data.cookNote}</div>}
      <p style={{margin:"0 0 10px",fontSize:12,color:"#cbd5e1",lineHeight:1.6,flex:1,whiteSpace:"pre-line"}}>{data.detail}</p>
      <MacroGrid cal={data.cal} pro={data.pro} fat={data.fat} chol={data.chol} accentColor={profile.color} isH={isH}/>
    </div>
  );

  const PersonRow = ({ hData, wData }) => (
    <div style={{display:"flex",gap:10,alignItems:"stretch"}}>
      <PersonCard profile={HP} data={hData} isH={true}/>
      <PersonCard profile={WP} data={wData} isH={false}/>
    </div>
  );

  const Card = ({ icon, label, title, prep, base, badge, hData, wData }) => (
    <div style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:13,padding:14,marginBottom:11}}>
      <div style={{marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
          <div style={{fontSize:9,fontWeight:900,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:1}}>{icon} {label}</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>{badge}</div>
        </div>
        <div style={{fontSize:15,fontWeight:800,color:"#f1f5f9",marginBottom:prep?4:0}}>{title}</div>
        {prep&&<div style={{fontSize:9,color:"#cbd5e1",background:"rgba(255,255,255,0.04)",padding:"3px 8px",borderRadius:20,border:"1px solid rgba(255,255,255,0.06)",display:"inline-block",marginTop:2}}>⏱ {prep}</div>}
      </div>
      {base&&<div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,padding:"7px 11px",marginBottom:10}}><span style={{fontSize:9,fontWeight:800,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:.5}}>🤝 Shared base: </span><span style={{fontSize:11,color:"#cbd5e1"}}>{base}</span></div>}
      <PersonRow hData={hData} wData={wData}/>
    </div>
  );

  const Badge = ({ label, color, bg, emoji }) => (
    <span style={{display:"inline-flex",alignItems:"center",gap:3,background:bg||`${color}18`,color,border:`1px solid ${color}44`,padding:"3px 8px",borderRadius:20,fontSize:9,fontWeight:800,letterSpacing:.3}}>
      {emoji} {label}
    </span>
  );

  const IngredientSummary = ({ title, icon, color, bg, border, items, isOpen, onToggle }) => (
    <div style={{background:"#0f172a",border:`1px solid ${isOpen?border:"rgba(255,255,255,0.06)"}`,borderRadius:14,marginBottom:12,overflow:"hidden"}}>
      <button onClick={onToggle} style={{width:"100%",background:"transparent",border:"none",cursor:"pointer",padding:"13px 16px",display:"flex",alignItems:"center",gap:10,textAlign:"left"}}>
        <div style={{width:36,height:36,borderRadius:10,flexShrink:0,background:bg,border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,fontWeight:900,color}}>{title}</div>
          <div style={{fontSize:10,color:"#cbd5e1",marginTop:1}}>{items.reduce((s,c)=>s+c.items.length,0)} items</div>
        </div>
        <span style={{color:"#cbd5e1",fontSize:13,transform:isOpen?"rotate(180deg)":"none",transition:".3s",flexShrink:0}}>▼</span>
      </button>
      {isOpen&&(
        <div style={{borderTop:`1px solid ${border}22`,padding:"12px 16px",columns:2,columnGap:20}}>
          {items.filter(cat=>cat.items.length>0).map((cat,i)=>(
            <div key={i} style={{breakInside:"avoid",marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:900,color,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{cat.cat}</div>
              {cat.items.map((item,j)=>(
                <div key={j} style={{marginBottom:6,fontSize:11,color:"#cbd5e1",lineHeight:1.4}}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const PrepTab = () => {
    const PREP_ITEMS = {
      sunday: [
        { key:"ratatouille", icon:"🫕", title:"Slow Cooker: Ratatouille", time:"15 min", desc:"Start first thing — 7–8 hrs LOW. Husband's weekday lunches Mon–Fri.", tag:"LUNCH BASE — HUSBAND MON–FRI", tagColor:"#f87171", tagBg:"rgba(248,113,113,0.1)", base:BASES.find(b=>b.key==="ratatouille") },
        { key:"cruciferous", icon:"✈️", title:"Prep Cruciferous Vegetables", time:"20 min", desc:"Wash, cut into florets, store raw in fridge. Air-fry 150g fresh before each Mon–Fri dinner.", tag:"DINNER BASE — BOTH · MON–FRI", tagColor:"#4ade80", tagBg:"rgba(74,222,128,0.1)", base:BASES.find(b=>b.key==="cruciferous") },
        { key:"chicken", icon:"🍗", title:"Batch Chicken Breast (~2.2 lbs)", time:"20 min", desc:"Lemon, garlic, salt · Air Fryer 400°F · 15 min · slice & refrigerate. 5oz every day, all 7 lunches.", tag:"BATCH PROTEIN — HUSBAND", tagColor:"#38bdf8", tagBg:"rgba(56,189,248,0.1)", base:null, ingredients:["~2.2 lbs chicken breast","1 lemon, juiced","3 garlic cloves, minced","Salt and black pepper"], steps:["Season chicken with lemon juice, garlic, salt and pepper.","Air Fryer 400°F · 15 min · flip halfway.","Rest 5 min. Slice and store in a sealed container."], storage:"Fridge 5 days" },
        { key:"salad", icon:"🥗", title:"Wife's Salad Base", time:"10 min", desc:"5 grab-and-go portions. Hard-boil eggs for Tue & Thu.", tag:"WIFE'S LUNCHES — MON–FRI", tagColor:"#fb923c", tagBg:"rgba(251,146,60,0.1)", base:null, ingredients:["500g mixed greens","3 medium cucumbers, sliced","3 bell peppers, diced","1 red onion, thinly sliced","Eggs (hard-boil for Tue & Thu)"], steps:["Chop all vegetables.","Divide into 5 equal containers.","Hard-boil eggs for Tue & Thu.","Add tuna, salmon or avocado fresh each day."], storage:"Fridge 5 days · Add protein + avocado fresh daily" },
      ],
      saturday: [
        { key:"mediterranean", icon:"🌊", title:"Roasted Mediterranean Vegetable Base", time:"30 min", desc:"Covers both Saturday AND Sunday dinners.", tag:"WEEKEND DINNER BASE — SAT & SUN", tagColor:"#fbbf24", tagBg:"rgba(251,191,36,0.1)", base:BASES.find(b=>b.key==="mediterranean") },
      ],
    };

    const PrepItem = ({ item }) => {
      const open = openPrep[item.key];
      const base = item.base;
      const ingredients = base ? base.ingredients : item.ingredients;
      const steps = base ? base.steps : item.steps;
      const storage = base ? base.storage : item.storage;
      const note = base ? base.note : null;
      return (
        <div style={{background:"#0f172a",border:`1px solid ${open?item.tagColor+"50":"rgba(255,255,255,0.07)"}`,borderRadius:14,marginBottom:10,overflow:"hidden"}}>
          <button onClick={()=>togglePrep(item.key)} style={{width:"100%",background:"transparent",border:"none",cursor:"pointer",padding:"13px 16px",display:"flex",alignItems:"flex-start",gap:12,textAlign:"left"}}>
            <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:item.tagBg,border:`1px solid ${item.tagColor}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{item.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,fontWeight:900,color:item.tagColor,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{item.tag}</div>
              <div style={{fontSize:15,fontWeight:900,color:"#f1f5f9",marginBottom:3}}>{item.title}</div>
              <div style={{fontSize:11,color:"#cbd5e1",lineHeight:1.5}}>{item.desc}</div>
              <span style={{display:"inline-block",marginTop:6,fontSize:9,color:item.tagColor,background:`${item.tagColor}12`,padding:"2px 8px",borderRadius:20,border:`1px solid ${item.tagColor}30`}}>⏱ {item.time}</span>
            </div>
            <span style={{color:"#cbd5e1",fontSize:13,transform:open?"rotate(180deg)":"none",transition:".3s",flexShrink:0,marginTop:4}}>▼</span>
          </button>
          {open&&(
            <div style={{borderTop:`1px solid ${item.tagColor}20`,padding:16}}>
              {note&&<div style={{background:item.tagBg,border:`1px solid ${item.tagColor}22`,borderRadius:9,padding:"9px 13px",marginBottom:14}}>
                <p style={{margin:0,fontSize:12,color:item.tagColor,lineHeight:1.5,fontStyle:"italic"}}>{note}</p>
              </div>}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div>
                  <div style={{fontSize:10,fontWeight:900,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Ingredients</div>
                  {ingredients.map((ing,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:7,alignItems:"flex-start"}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:item.tagColor,flexShrink:0,marginTop:5}}/>
                      <span style={{fontSize:11.5,color:"#cbd5e1",lineHeight:1.5}}>{ing}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{fontSize:10,fontWeight:900,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Instructions</div>
                  {steps.map((step,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:9,alignItems:"flex-start"}}>
                      <div style={{width:18,height:18,borderRadius:"50%",background:item.tagBg,border:`1px solid ${item.tagColor}44`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:item.tagColor}}>{i+1}</div>
                      <span style={{fontSize:11.5,color:"#cbd5e1",lineHeight:1.55}}>{step}</span>
                    </div>
                  ))}
                  {storage&&<div style={{marginTop:10,background:"rgba(0,0,0,.3)",borderRadius:8,padding:"8px 12px",fontSize:10.5,color:"#cbd5e1"}}>📦 {storage}</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div>
        <div style={{background:"rgba(56,189,248,0.04)",border:"1px solid rgba(56,189,248,0.18)",borderRadius:14,padding:"12px 14px",marginBottom:10}}>
          <div style={{fontWeight:900,fontSize:13,color:"#38bdf8",marginBottom:2}}>☀️ Sunday Prep — ~65 min</div>
          <div style={{fontSize:11,color:"#cbd5e1"}}>Covers all weekday lunches & dinners. Click any task to see the full recipe.</div>
        </div>
        {PREP_ITEMS.sunday.map(item=><PrepItem key={item.key} item={item}/>)}

        <div style={{background:"rgba(251,191,36,0.04)",border:"1px solid rgba(251,191,36,0.18)",borderRadius:14,padding:"12px 14px",marginBottom:10,marginTop:6}}>
          <div style={{fontWeight:900,fontSize:13,color:"#fbbf24",marginBottom:2}}>🌊 Saturday Morning — ~30 min</div>
          <div style={{fontSize:11,color:"#cbd5e1"}}>Weekend dinner base for Sat & Sun. Click to see the full recipe.</div>
        </div>
        {PREP_ITEMS.saturday.map(item=><PrepItem key={item.key} item={item}/>)}

        <div style={{marginTop:6}}>
          <IngredientSummary title="🛒 Weekly Shopping List" icon="🛒" color="#10b981" bg="rgba(16,185,129,0.08)" border="rgba(16,185,129,0.3)" items={SHOPPING_LIST} isOpen={openIngredients.shopping} onToggle={()=>setOpenIngredients(p=>({...p,shopping:!p.shopping}))}/>
        </div>

        <div style={{background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.22)",borderRadius:14,padding:"14px 16px"}}>
          <div style={{fontWeight:900,fontSize:12,color:"#f87171",marginBottom:10}}>❤️ HEART HEALTH PROTOCOL — Husband</div>
          {[
            ["💊","Nature's Bounty Fish Oil 1200mg × 10 softgels/day = 12,000mg fish oil · 3,600mg EPA+DHA. Take 5 with lunch + 5 with dinner for best absorption."],
            ["🍣","Salmon 2× per week (Tue + Sat) provides additional food-source EPA & DHA — most impactful dietary combination for Trig 300."],
            ["🥦","Both batch bases = 0mg cholesterol. Your budgeted protein sources carry all the dietary chol."],
            ["🌾","1 tbsp chia seeds in morning shake daily — ALA omega-3 + soluble fiber, lowers LDL 10–15% with consistent use."],
            ["🫒","Avocado oil only — high monounsaturated fat improves HDL:LDL ratio, ideal smoke point for air frying."],
            ["🥚","Liquid egg whites only — 0mg cholesterol, ~4g protein per cup."],
            ["🌰","Daily almonds and hazelnuts provide vitamin E, plant sterols and monounsaturated fats that support healthy LDL."],
            ["📊",`Weekly average dietary cholesterol: ${avgHChol}mg/day — under the 220mg cap.`],
          ].map(([icon,tip],i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <span style={{fontSize:16,flexShrink:0,lineHeight:1.3}}>{icon}</span>
              <p style={{margin:0,fontSize:12,color:"#fca5a5",lineHeight:1.55}}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DayTab = ({ d }) => {
    const { meals, totals, heartNote, isWeekend, dinner } = d;
    const dt = DT[dinner.type];
    return (
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          <Badge label={`${dinner.label} ${dt.label}`} color={dt.color} bg={dt.bg} emoji={dt.emoji}/>
        </div>
        <div style={{background:`${dt.color}08`,border:`1px solid ${dt.color}22`,borderRadius:10,padding:"8px 13px",marginBottom:11}}>
          <div style={{fontSize:10,fontWeight:800,color:dt.color,marginBottom:4}}>🧂 {dinner.type==="tofu"?"Sauce":"Seasoning"}</div>
          <div style={{fontSize:11,color:"#cbd5e1",lineHeight:1.7}}>{dinner.sauce}</div>
        </div>
        <div style={{background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.17)",borderRadius:11,padding:"10px 13px",marginBottom:13,display:"flex",gap:9,alignItems:"flex-start"}}>
          <span style={{fontSize:16,flexShrink:0}}>❤️</span>
          <p style={{margin:0,fontSize:12,color:"#fca5a5",lineHeight:1.55}}>{heartNote}</p>
        </div>

        {/* Breakfast */}
        {!isWeekend ? (
          <div style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:13,padding:14,marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div>
                <div style={{fontSize:9,fontWeight:900,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:1}}>🌅 Breakfast</div>
                <div style={{fontSize:15,fontWeight:800,color:"#f1f5f9",marginTop:2}}>{meals.breakfast.H.name}</div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <Badge label="NO COOK" color="#4ade80" emoji="⚡"/>
                <Badge label="LOCKED" color="#38bdf8" emoji="🔒"/>
              </div>
            </div>
            <PersonRow hData={meals.breakfast.H} wData={meals.breakfast.W}/>
          </div>
        ) : (
          <Card icon="🌅" label="Breakfast" title={meals.breakfast.name} prep={meals.breakfast.prep}
            base={meals.breakfast.base}
            badge={<Badge label="COOKED" color="#fbbf24" emoji="🍳"/>}
            hData={meals.breakfast.H} wData={meals.breakfast.W}/>
        )}

        {/* Lunch */}
        <div style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)",borderRadius:13,padding:14,marginBottom:11}}>
          <div style={{fontSize:9,fontWeight:900,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🥗 Lunch</div>
          {!isWeekend&&meals.lunch.H.base&&(
            <div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(248,113,113,.09)",border:"1px solid rgba(248,113,113,.25)",padding:"3px 10px",borderRadius:20,fontSize:9,fontWeight:800,color:"#fca5a5",marginBottom:9}}>
              🫕 Ratatouille base — microwave 90 sec
            </div>
          )}
          <div style={{display:"flex",gap:10,alignItems:"stretch"}}>
            <div style={{flex:1,minWidth:0,background:HP.bg,border:`1px solid ${HP.border}`,borderRadius:10,padding:12,display:"flex",flexDirection:"column"}}>
              <div style={{fontSize:10,fontWeight:900,color:HP.color,letterSpacing:.8,textTransform:"uppercase",marginBottom:4}}>💪 HUSBAND</div>
              {meals.lunch.H.cookNote&&<div style={{fontSize:10,color:"#94a3b8",marginBottom:5,fontStyle:"italic"}}>{meals.lunch.H.cookNote}</div>}
              <p style={{margin:"0 0 10px",fontSize:12,color:"#cbd5e1",lineHeight:1.6,flex:1}}>{meals.lunch.H.detail}</p>
              <MacroGrid cal={meals.lunch.H.cal} pro={meals.lunch.H.pro} fat={meals.lunch.H.fat} chol={meals.lunch.H.chol} accentColor={HP.color} isH={true}/>
            </div>
            <div style={{flex:1,minWidth:0,background:WP.bg,border:`1px solid ${WP.border}`,borderRadius:10,padding:12,display:"flex",flexDirection:"column"}}>
              <div style={{fontSize:10,fontWeight:900,color:WP.color,letterSpacing:.8,textTransform:"uppercase",marginBottom:4}}>🏃‍♀️ WIFE{!isWeekend&&meals.lunch.W.eggDay&&" · 🥚 EGG DAY"}</div>
              {meals.lunch.W.cookNote&&<div style={{fontSize:10,color:"#94a3b8",marginBottom:5,fontStyle:"italic"}}>{meals.lunch.W.cookNote}</div>}
              <p style={{margin:"0 0 10px",fontSize:12,color:"#cbd5e1",lineHeight:1.6,flex:1}}>{meals.lunch.W.detail}</p>
              <MacroGrid cal={meals.lunch.W.cal} pro={meals.lunch.W.pro} fat={meals.lunch.W.fat} chol={meals.lunch.W.chol} accentColor={WP.color} isH={false}/>
            </div>
          </div>
        </div>

        <Card icon="🥜" label="Snacks" title="Daily Snacks" prep={null} base={null}
          badge={<><Badge label="NO COOK" color="#4ade80" emoji="⚡"/><Badge label="LOCKED" color="#38bdf8" emoji="🔒"/></>}
          hData={meals.snacks.H} wData={meals.snacks.W}/>

        <Card icon="🍽️" label="Dinner"
          title={`${dinner.label} ${dt.label.charAt(0)+dt.label.slice(1).toLowerCase()} · ${isWeekend?"Mediterranean Veg Base":"Cruciferous Medley"}`}
          prep={meals.dinner.prep} base={null}
          badge={<Badge label={dt.label} color={dt.color} bg={dt.bg} emoji={dt.emoji}/>}
          hData={meals.dinner.H} wData={meals.dinner.W}/>

        {/* Daily Totals */}
        <div style={{background:"#0a1120",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:16}}>
          <div style={{fontSize:10,fontWeight:900,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>📊 {d.full} — Daily Totals</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[[HP,totals.H,true],[WP,totals.W,false]].map(([profile,tot,isH])=>(
              <div key={profile.name} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${profile.border}`,borderRadius:12,padding:12}}>
                <div style={{fontWeight:800,fontSize:14,color:profile.color,marginBottom:12}}>{profile.emoji} {profile.name}</div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,alignItems:"baseline"}}>
                  <span style={{fontSize:11,color:"#cbd5e1"}}>Calories</span>
                  <div><span style={{fontSize:20,fontWeight:900,color:profile.color}}>{tot.cal}</span><span style={{fontSize:10,color:"#cbd5e1"}}> /{profile.targets.cal}</span></div>
                </div>
                <Bar label="Protein" val={tot.pro} target={profile.targets.pro} color={profile.color} unit="g"/>
                <Bar label="Fat" val={tot.fat} target={profile.targets.fat} color={profile.color} unit="g"/>
                <Bar label="Cholesterol" val={tot.chol} target={profile.targets.chol} color={profile.color} unit="mg" isChol={true}/>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    );
  };

  const activeDay = DAYS.find(d=>d.day===tab);
  const tabs = [
    {id:"prep", isPrep:true, color:"#fbbf24"},
    ...DAYS.map(d=>({id:d.day, isPrep:false, day:d.day, cal:d.totals.H.cal, pro:d.totals.H.pro, chol:d.totals.H.chol, color:d.color, dinnerEmoji:DT[d.dinner.type].emoji, dinnerLabel:d.dinner.label, dinnerType:DT[d.dinner.type].label, dinnerColor:DT[d.dinner.type].color}))
  ];

  return (
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:"#060d18",minHeight:"100vh",color:"#e2e8f0",maxWidth:820,margin:"0 auto",overflowX:"hidden",width:"100%"}}>
      <div style={{background:"linear-gradient(180deg,#0b1628,#060d18)",padding:"20px 18px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <h1 style={{margin:"0 0 3px",fontSize:21,fontWeight:900,letterSpacing:-.5}}>❤️ Kolano's Meal Plan</h1>
            
          </div>

        </div>

        {/* Profile cards — shared grid rows */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 10px",marginBottom:12}}>
          {[HP,WP].map(p=>(
            <div key={p.name+"name"} style={{background:p.bg,border:`1px solid ${p.border}`,borderBottom:"none",borderRadius:"12px 12px 0 0",padding:"14px 14px 6px",display:"flex",alignItems:"center",gap:7}}>
              <span style={{fontSize:18,lineHeight:1,flexShrink:0}}>{p.emoji}</span>
              <span style={{fontWeight:900,fontSize:14,color:p.color,lineHeight:1}}>{p.name}</span>
            </div>
          ))}
          {[HP,WP].map(p=>(
            <div key={p.name+"stats"} style={{background:p.bg,borderLeft:`1px solid ${p.border}`,borderRight:`1px solid ${p.border}`,padding:"0 14px 4px",fontSize:10,color:"#cbd5e1"}}>{p.stats}</div>
          ))}
          {[HP,WP].map(p=>(
            <div key={p.name+"health"} style={{background:p.bg,borderLeft:`1px solid ${p.border}`,borderRight:`1px solid ${p.border}`,padding:"0 14px 6px",fontSize:10,color:"#ff8888"}}>⚠️ {p.health}</div>
          ))}
          {[HP,WP].map(p=>(
            <div key={p.name+"goal"} style={{background:p.bg,borderLeft:`1px solid ${p.border}`,borderRight:`1px solid ${p.border}`,padding:"0 14px 10px",fontSize:10,color:"#4ade80"}}>🎯 {p.goal}</div>
          ))}
          {[HP,WP].map(p=>(
            <div key={p.name+"targets"} style={{background:p.bg,border:`1px solid ${p.border}`,borderTop:"none",borderRadius:"0 0 12px 12px",padding:"0 14px 14px"}}>
              <div style={{background:"rgba(0,0,0,.4)",borderRadius:7,padding:"5px 10px",fontSize:9,color:p.color,fontWeight:800}}>
                {p.targets.cal} kcal · {p.targets.pro}g P · {`<${p.targets.chol}mg chol`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{background:"#0a1120",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"0 4px",display:"flex"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1,padding:"6px 2px",
            background:tab===t.id?t.color:"transparent",
            color:tab===t.id?"#fff":"#94a3b8",
            border:"none",borderRadius:"0 0 8px 8px",cursor:"pointer",
            fontWeight:900,transition:"all .2s",
            boxShadow:tab===t.id?`0 4px 14px ${t.color}44`:"none",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:0,minWidth:0,overflow:"hidden",
          }}>
            {t.isPrep?(
              <>
                <span style={{fontSize:10,fontWeight:900,color:"#fff",lineHeight:1.3,height:14,display:"flex",alignItems:"center"}}>PREP</span>
                <span style={{fontSize:12,lineHeight:1.2,height:18,display:"flex",alignItems:"center"}}>☀️</span>
                <span style={{fontSize:8,fontWeight:900,height:12,display:"flex",alignItems:"center"}}></span>
                <span style={{fontSize:8,fontWeight:800,height:24,display:"flex",alignItems:"flex-start"}}></span>
              </>
            ):(
              <>
                <span style={{fontSize:10,fontWeight:900,color:"#fff",lineHeight:1.3,height:14,display:"flex",alignItems:"center"}}>{t.day}</span>
                <span style={{fontSize:12,lineHeight:1.2,height:18,display:"flex",alignItems:"center"}}>{t.dinnerEmoji}</span>
                <span style={{fontSize:8,fontWeight:900,color:tab===t.id?"rgba(255,255,255,0.9)":t.dinnerColor,textTransform:"uppercase",lineHeight:1.2,height:12,display:"flex",alignItems:"center"}}>{t.dinnerType}</span>
                <span style={{fontSize:7,fontWeight:800,color:tab===t.id?"rgba(255,255,255,0.7)":t.dinnerColor+"99",textTransform:"uppercase",textAlign:"center",lineHeight:1.2,height:24,display:"flex",alignItems:"flex-start",justifyContent:"center",width:"100%",wordBreak:"break-word"}}>{t.dinnerLabel}</span>
              </>
            )}
          </button>
        ))}
      </div>

      <div style={{padding:16,overflowX:"hidden"}}>
        {tab==="prep"?<PrepTab/>:activeDay&&<DayTab d={activeDay}/>}
      </div>
    </div>
  );
}
