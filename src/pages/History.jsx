import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const History = ({ getMovieDetail }) => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("movies") || [])
  );
  const [history1, setHistory1] = useState(
    JSON.parse(localStorage.getItem("movies") || [])
  );
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );
  const [searchTerm, setsearchTerm] = useState("");
  const [tab, setTab] = useState(1);
  const [hoveredDiv, setHoveredDiv] = useState();

  const deleteInidividualMovie = (id) => {
    // history.find((ele) => ele.Id === id)
    const filteredItems = history.filter((item) => item.Id !== id);
    localStorage.setItem("movies", JSON.stringify(filteredItems));
    setHistory(filteredItems);
  };
  // trial
  useEffect(() => {
    (() => {
      // const data = JSON.parse(localStorage.getItem("movies") || []);
      /* const d2 = JSON.parse(
        `[{"imdb_id":"tt4213764","Id":358403,"movieId":358403,"Genre":"Thriller","Director":"Nicolas Saada","Actor":"Stacy Martin, Louis-Do de Lencquesaing, Gina McKee","Title":"Taj Mahal","Duration":89,"Release":"2015","Description":"One evening, while her parents go out for dinner, 18-year-old Louise, alone in her hotel room at Taj Mahal Mumbai, hears strange noises out in the corridor. Within minutes, she realises that a terrorist attack is underway. Her only connection to the outside world is her cell phone, which allows her to maintain contact with her father, who is desperately trying to reach her from the other side of a city that has been plunged into chaos. Louise must spend a long night alone in the face of danger. She will never be the same again.","Rating":11.266,"Trailer":"","Country":"Belgium","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/mscbgXlFLm5NVRZywsdwxdSWkR1.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/lJvnpD8FILATQNBpUi02vo3B3MK.jpg","Watch":"https://vidsrc.xyz/embed/movie/358403"},{"imdb_id":"tt0976051","Id":8055,"movieId":8055,"Genre":"Drama, Romance","Director":"Stephen Daldry","Actor":"Kate Winslet, Ralph Fiennes, David Kross","Title":"The Reader","Duration":124,"Release":"2008","Description":"The story of Michael Berg, a German lawyer who, as a teenager in the late 1950s, had an affair with an older woman, Hanna, who then disappeared only to resurface years later as one of the defendants in a war crimes trial stemming from her actions as a concentration camp guard late in the war. He alone realizes that Hanna is illiterate and may be concealing that fact at the expense of her freedom.","Rating":38.476,"Trailer":"https://www.youtube.com/watch?v=JA1J2WmFGUw","Country":"Germany","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/r0WURbmnhgKeBpHcpDULBgRedQM.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/3vGik9ZJWaH7izTwqeZ3PhPLInV.jpg","Watch":"https://vidsrc.xyz/embed/movie/8055"},{"imdb_id":"tt0481141","Id":3638,"movieId":3638,"Genre":"Comedy, Romance, Drama","Director":"Scott Hicks","Actor":"Catherine Zeta-Jones, Aaron Eckhart, Abigail Breslin","Title":"No Reservations","Duration":104,"Release":"2007","Description":"Master chef Kate Armstrong runs her life and her kitchen with intimidating intensity. However, a recipe for disaster may be in the works when she becomes the guardian of her young niece while crossing forks with the brash sous-chef who just joined her staff. Though romance blooms in the face of rivalry, Kate needs to look outside the kitchen to find true happiness.","Rating":30.028,"Trailer":"https://www.youtube.com/watch?v=qm68An_PzAs","Country":"Australia","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/eKqfRSf0DZ0Qey1f9ZHuZfsmXVR.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/rmlgq2gjiXBK3YNWj6WSdueLv0o.jpg","Watch":"https://vidsrc.xyz/embed/movie/3638"},{"imdb_id":"tt4465564","Id":341174,"movieId":341174,"Genre":"Drama, Romance","Director":"James Foley","Actor":"Dakota Johnson, Jamie Dornan, Eric Johnson","Title":"Fifty Shades Darker","Duration":118,"Release":"2017","Description":"When a wounded Christian Grey tries to entice a cautious Ana Steele back into his life, she demands a new arrangement before she will give him another chance. As the two begin to build trust and find stability, shadowy figures from Christian’s past start to circle the couple, determined to destroy their hopes for a future together.","Rating":73.859,"Trailer":"https://www.youtube.com/watch?v=VtqH8GckI2c","Country":"Japan","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/7CBO9GhsUeMSsWQb47WTPZnKjdj.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/9dWH18IZf0KdGx0kJaONzWcmD69.jpg","Watch":"https://vidsrc.xyz/embed/movie/341174"},{"imdb_id":"tt1099212","Id":8966,"movieId":8966,"Genre":"Fantasy, Drama, Romance","Director":"Catherine Hardwicke","Actor":"Kristen Stewart, Robert Pattinson, Billy Burke","Title":"Twilight","Duration":122,"Release":"2008","Description":"When Bella Swan moves to a small town in the Pacific Northwest, she falls in love with Edward Cullen, a mysterious classmate who reveals himself to be a 108-year-old vampire. Despite Edward's repeated cautions, Bella can't stay away from him, a fatal move that endangers her own life.","Rating":102.807,"Trailer":"https://www.youtube.com/watch?v=XVRQGTlr_XE","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/3GkUvuGoUTNNEBFnwaH4LDCHfqnerkTcj9.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/7eK8FJr4fqq3J5W2xvlr2GVaep2.jpg","Watch":"https://vidsrc.xyz/embed/movie/8966"},{"imdb_id":"tt1324999","Id":50619,"movieId":50619,"Genre":"Adventure, Fantasy, Romance","Director":"Bill Condon","Actor":"Kristen Stewart, Robert Pattinson, Taylor Lautner","Title":"The Twilight Saga: Breaking Dawn - Part 1","Duration":117,"Release":"2011","Description":"The new found married bliss of Bella Swan and vampire Edward Cullen is cut short when a series of betrayals and misfortunes threatens to destroy their world.","Rating":94.035,"Trailer":"https://www.youtube.com/watch?v=xdGQKA0PipM","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/qs8LsHKYlVRmJbFUiSUhhRAygwj.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/yLpMWckfrzRiNZxB2tgBa5TkUKh.jpg","Watch":"https://vidsrc.xyz/embed/movie/50619"},{"imdb_id":"tt1598822","Id":62838,"movieId":62838,"Genre":"Comedy, Romance","Director":"Garry Marshall","Actor":"Hilary Swank, Robert De Niro, Michelle Pfeiffer","Title":"New Year's Eve","Duration":118,"Release":"2011","Description":"The lives of several couples and singles in New York intertwine over the course of New Year's Eve.","Rating":28.971,"Trailer":"https://www.youtube.com/watch?v=pnDzKi5j_9Q","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/nNh8PDzkx4dUdNYtlzAiprpNs5e.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/ryci9wQygdRfeElrSEbYxkHHget.jpg","Watch":"https://vidsrc.xyz/embed/movie/62838"},{"imdb_id":"tt0269095","Id":13536,"movieId":13536,"Genre":"Crime, Drama, Mystery","Director":"Michael Caton-Jones","Actor":"Robert De Niro, Frances McDormand, James Franco","Title":"City by the Sea","Duration":108,"Release":"2002","Description":"Vincent LaMarca is a dedicated and well-respected New York City police detective who has gone to great lengths to distance himself from his past, but then makes the terrible discovery that his own son has fallen into a life of crime.","Rating":16.026,"Trailer":"https://www.youtube.com/watch?v=ssQu16utnR8","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/vpjKtnE5SGTfmdw4YtJsnrfFJs0.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/kwY1HeoEIDXCdpb4PMdyzCiBUCV.jpg","Watch":"https://vidsrc.xyz/embed/movie/13536"},{"Id":412090,"movieId":412090,"imdb_id":"tt5982852","Genre":"Comedy, Crime","Director":"Subhash Kapoor","Actor":"Akshay Kumar, Annu Kapoor, Saurabh Shukla","Title":"Jolly LLB 2","Duration":140,"Release":"2017","Description":"A blunt, abrasive and yet oddly compassionate Jagdishwar Mishra aka Jolly, a small-time struggling lawyer who moves from Kanpur to the city of Nawabs to pursue his dream of becoming a big-time lawyer.","Rating":12.411,"Trailer":"","Country":"India","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/n9MjoGmaYagaaETCQP0S6Ch3JLH.jpg","Cover":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/qXWNHWxWoSz6FNFlSKAtZIKPyy6.jpg","Watch":"https://vidsrc.xyz/embed/movie/412090"},{"imdb_id":"tt0303361","Id":10894,"movieId":10894,"Genre":"Drama, Horror, Romance","Director":"Lucky McKee","Actor":"Angela Bettis, Jeremy Sisto, Anna Faris","Title":"May","Duration":93,"Release":"2003","Description":"A socially awkward veterinary assistant with a lazy eye and obsession with perfection descends into depravity after developing a crush on a boy with perfect hands.","Rating":32.486,"Trailer":"https://www.youtube.com/watch?v=YbN_uoGQysc","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/oFXhJYTax1cnNtgvLdKlXuYiWPV.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/A4b1wDR4i6GU1Jj9duEGeAUChqB.jpg","Watch":"https://vidsrc.xyz/embed/movie/10894"},{"imdb_id":"tt1216475","Id":49013,"movieId":49013,"Genre":"Animation, Family, Adventure, Comedy","Director":"John Lasseter","Actor":"Larry the Cable Guy, Owen Wilson, Michael Caine","Title":"Cars 2","Duration":106,"Release":"2011","Description":"Star race car Lightning McQueen and his pal Mater head overseas to compete in the World Grand Prix race. But the road to the championship becomes rocky as Mater gets caught up in an intriguing adventure of his own: international espionage.","Rating":92.837,"Trailer":"https://www.youtube.com/watch?v=LAmOI2MSW20","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/okIz1HyxeVOMzYwwHUjH2pHi74I.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/jTx4XlVsLJkDwbEQkFYwpApD556.jpg","Watch":"https://vidsrc.xyz/embed/movie/49013"},{"imdb_id":"tt3606752","Id":260514,"movieId":260514,"Genre":"Family, Animation, Adventure, Comedy","Director":"Brian Fee","Actor":"Owen Wilson, Cristela Alonzo, Chris Cooper","Title":"Cars 3","Duration":102,"Release":"2017","Description":"Blindsided by a new generation of blazing-fast racers, the legendary Lightning McQueen is suddenly pushed out of the sport he loves. To get back in the game, he will need the help of an eager young race technician with her own plan to win, inspiration from the late Fabulous Hudson Hornet, and a few unexpected turns. Proving that #95 isn't through yet will test the heart of a champion on Piston Cup Racing’s biggest stage!","Rating":102.851,"Trailer":"https://www.youtube.com/watch?v=ZuaseSovWDY","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/jJ8TnHvWHaVadW5JJjGYsM07j9i.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/86TlYSntBzD4pxLNM6U3GoOfGdD.jpg","Watch":"https://vidsrc.xyz/embed/movie/260514"},{"imdb_id":"tt0367594","Id":"7172","Genre":"Adventure, Comedy, Family, Fantasy","Actor":"Johnny Depp, Freddie Highmore, David Kelly","Director":"Tim Burton","Country":"United States, United Kingdom","Duration":115,"Release":"2005","Rating":100.673,"Cover":"https://img.cdno.my.id/cover/w_1200/h_500/charlie-and-the-chocolate-factory-7172.jpg","Title":"Charlie and the Chocolate Factory","Watch":"https://vidsrc.xyz/embed/movie/118","Thumbnail":"https://img.cdno.my.id/thumb/w_200/h_300/charlie-and-the-chocolate-factory-7172.jpg","Description":"A young boy wins a tour through the most magnificent chocolate factory in the world, led by the world's most unusual candy maker.","Trailer":"https://www.youtube.com/watch?v=wcdBCanllNA","movieId":118},{"imdb_id":"tt0037012","Id":"228958","movieId":228958,"Genre":"Mystery, Comedy, Drama","Director":"William Beaudine","Actor":"James Dunn, Wanda McKay, Jack La Rue","Title":"Leave It to the Irish","Duration":71,"Release":"1944","Description":"A private eye (James Dunn) investigates the murder of a fur dealer. Monogram.","Rating":1.828,"Trailer":"","Country":"United States of America","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2null","Cover":"https://image.tmdb.org/t/p/w300_and_h450_bestv2null","Watch":"https://vidsrc.xyz/embed/movie/228958"},{"imdb_id":"tt0088763","Id":105,"movieId":105,"Genre":"Adventure, Comedy, Science Fiction","Director":"Robert Zemeckis","Actor":"Michael J. Fox, Christopher Lloyd, Crispin Glover","Title":"Back to the Future","Duration":116,"Release":"1985","Description":"Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents' first meeting and attracting his mother's romantic interest. Marty must repair the damage to history by rekindling his parents' romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.","Rating":93.151,"Trailer":"https://www.youtube.com/watch?v=qbGwlvgpySE","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/hxSB02ksqnkXY4hPGAXqgO2fL01.jpg","Watch":"https://vidsrc.xyz/embed/movie/105"},{"imdb_id":"tt0032138","Id":630,"movieId":630,"Genre":"Adventure, Fantasy, Family","Director":"Victor Fleming","Actor":"Judy Garland, Ray Bolger, Jack Haley","Title":"The Wizard of Oz","Duration":102,"Release":"1939","Description":"Young Dorothy finds herself in a magical world where she makes friends with a lion, a scarecrow and a tin man as they make their way along the yellow brick road to talk with the Wizard and ask for the things they miss most in their lives. The Wicked Witch of the West is the only thing that could stop them.","Rating":68.103,"Trailer":"https://www.youtube.com/watch?v=nk8pDLHf-a0","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/pfAZFD7I2hxW9HCChTuAzsdE6UX.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/nRsr98MFztBGm532hCVMGXV6qOp.jpg","Watch":"https://vidsrc.xyz/embed/movie/630"},{"imdb_id":"tt1473345","Id":22259,"movieId":22259,"Genre":"Action, Adventure, Animation, Family, Science Fiction","Director":"Mark Baldo","Actor":"Jeff Bennett, Dee Bradley Baker, Jim Cummings","Title":"Bionicle: The Legend Reborn","Duration":80,"Release":"2009","Description":"Once the ruler of an entire universe, the Great Spirit Mata Nui finds himself cast out of his own body, his spirit trapped inside the fabled Mask of Life, hurtling through space. After landing on the far-away planet of Bara Magna, the mask creates a new body for Mata Nui, who unwillingly gets caught up in the furious battles of the nearly barren and dangerous planet.","Rating":15.167,"Trailer":"https://www.youtube.com/watch?v=NApp4JD8RkE","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/82wbeiwdUd3q9v74qwp3VTPUA1p.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/4dJAwo6temSLWqpglAdqfFGx9FR.jpg","Watch":"https://vidsrc.xyz/embed/movie/22259"},{"imdb_id":"tt3411432","Id":326215,"movieId":326215,"Genre":"Animation, Adventure, Comedy, Family","Director":"Toby Genkel","Actor":"Callum Maloney, Dermot Magennis, Ava Connolly","Title":"Ooops! Noah Is Gone...","Duration":85,"Release":"2015","Description":"It's the end of the world. A flood is coming. Luckily for Dave and his son Finny, a couple of clumsy Nestrians, an Ark has been built to save all animals. But as it turns out, Nestrians aren't allowed. Sneaking on board with the involuntary help of Hazel and her daughter Leah, two Grymps, they think they're safe. Until the curious kids fall off the Ark. Now Finny and Leah struggle to survive the flood and hungry predators and attempt to reach the top of a mountain, while Dave and Hazel must put aside their differences, turn the Ark around and save their kids. It's definitely not going to be smooth sailing.","Rating":19.643,"Trailer":"https://www.youtube.com/watch?v=pw8276BAPAw","Country":"Belgium","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/gEJXHgpiKh89Vwjc4XUY5CIgUdB.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/pnw8hdc2RWXGW7mLHzCVUKt0BGI.jpg","Watch":"https://vidsrc.xyz/embed/movie/326215"},{"Id":314555,"movieId":314555,"imdb_id":"tt2296857","Genre":"Drama","Director":"Bernard Bellefroid","Actor":"Rachael Blake, Lucie Debay, Don Gallagher","Title":"Melody","Duration":90,"Release":"2014","Description":"Melody, 28 years old, a confused child born under the name X, decides to rent out her body in order to get the money she needs to realize her dream: opening a hair-dressing salon. To do so, she accepts to carry the child of Emily, a rich English woman 48 years old who can no longer have children. To make sure everything goes well and keep an eye on her future child, Emily decides to welcome Melody into her home and stay by her side throughout the pregnancy. Although they first appear to come from completely different worlds, the two women end up adopting each other: Melody finds in Emily the mother she never had, and Emily sees in Melody the daughter she always wanted to have. Evidently, the bonds that emerge during this double maternity create all sorts of doubts and questions.","Rating":3.521,"Trailer":"","Country":"France","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/z44Ovs0ITXcvTb3Rvn5nnxXXgVM.jpg","Cover":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/9eVAJ4Ulpy6es0GXNaJPXk3zxta.jpg","Watch":"https://vidsrc.xyz/embed/movie/314555"},{"imdb_id":"tt6139732","Id":420817,"movieId":420817,"Genre":"Adventure, Fantasy, Romance, Family","Director":"Guy Ritchie","Actor":"Will Smith, Mena Massoud, Naomi Scott","Title":"Aladdin","Duration":127,"Release":"2019","Description":"A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.","Rating":122.451,"Trailer":"https://www.youtube.com/watch?v=NCO7Qk2m4hk","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/ykUEbfpkf8d0w49pHh0AD2KrT52.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/rVqY0Bo4Npf6EIONUROxjYAJfmD.jpg","Watch":"https://vidsrc.xyz/embed/movie/420817"},{"imdb_id":"tt4154796","Id":299534,"movieId":299534,"Genre":"Adventure, Science Fiction, Action","Director":"Anthony Russo, Joe Russo","Actor":"Robert Downey Jr., Chris Evans, Mark Ruffalo","Title":"Avengers: Endgame","Duration":181,"Release":"2019","Description":"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.","Rating":211.67,"Trailer":"https://www.youtube.com/watch?v=8BNA-N717A0","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg","Watch":"https://vidsrc.xyz/embed/movie/299534"},{"imdb_id":"tt4154756","Id":299536,"movieId":299536,"Genre":"Adventure, Action, Science Fiction","Director":"Anthony Russo, Joe Russo","Actor":"Robert Downey Jr., Chris Hemsworth, Mark Ruffalo","Title":"Avengers: Infinity War","Duration":149,"Release":"2018","Description":"As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.","Rating":242.614,"Trailer":"https://www.youtube.com/watch?v=PARfU2Vi694","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg","Watch":"https://vidsrc.xyz/embed/movie/299536"},{"imdb_id":"tt5463162","Id":383498,"movieId":383498,"Genre":"Action, Comedy, Adventure","Director":"David Leitch","Actor":"Ryan Reynolds, Josh Brolin, Morena Baccarin","Title":"Deadpool 2","Duration":120,"Release":"2018","Description":"Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.","Rating":265.291,"Trailer":"https://www.youtube.com/watch?v=20bpjtCbCz0","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg","Watch":"https://vidsrc.xyz/embed/movie/383498"},{"imdb_id":"tt5095030","Id":363088,"movieId":363088,"Genre":"Action, Adventure, Science Fiction","Director":"Peyton Reed","Actor":"Paul Rudd, Evangeline Lilly, Michael Peña","Title":"Ant-Man and the Wasp","Duration":119,"Release":"2018","Description":"Just when his time under house arrest is about to end, Scott Lang once again puts his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.","Rating":47.152,"Trailer":"https://www.youtube.com/watch?v=UUkn-enk2RU","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/cFQEO687n1K6umXbInzocxcnAQz.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/iYdgEUE2W2aJkgqfSjf1x3gFfuV.jpg","Watch":"https://vidsrc.xyz/embed/movie/363088"},{"imdb_id":"tt1270797","Id":335983,"movieId":335983,"Genre":"Science Fiction, Action","Director":"Ruben Fleischer","Actor":"Tom Hardy, Michelle Williams, Riz Ahmed","Title":"Venom","Duration":112,"Release":"2018","Description":"Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.","Rating":474.616,"Trailer":"https://www.youtube.com/watch?v=Worz_qCsYvU","Country":"China","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg","Watch":"https://vidsrc.xyz/embed/movie/335983"},{"imdb_id":"tt7097896","Id":"1630851645","Genre":"Science Fiction, Action, Adventure","Actor":"Tom Hardy, Woody Harrelson, Michelle Williams","Director":"Andy Serkis","Country":"United States, United Kingdom, Canada","Duration":97,"Release":"2021","Rating":151.036,"Cover":"https://img.cdno.my.id/cover/w_1200/h_500/venom-let-there-be-carnage-1630851645.jpg","Title":"Venom: Let There Be Carnage","Watch":"https://vidsrc.xyz/embed/movie/580489","Thumbnail":"https://img.cdno.my.id/thumb/w_200/h_300/venom-let-there-be-carnage-1630851645.jpg","Description":"After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.","Trailer":"https://www.youtube.com/watch?v=j5Jq6jA1jLA","movieId":580489},{"imdb_id":"tt4123430","Id":338952,"movieId":338952,"Genre":"Fantasy, Adventure","Director":"David Yates","Actor":"Eddie Redmayne, Katherine Waterston, Dan Fogler","Title":"Fantastic Beasts: The Crimes of Grindelwald","Duration":134,"Release":"2018","Description":"Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating wizards above all non-magical beings. The only one capable of putting a stop to him is the wizard he once called his closest friend, Albus Dumbledore. However, Dumbledore will need to seek help from the wizard who had thwarted Grindelwald once before, his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.","Rating":36.128,"Trailer":"https://www.youtube.com/watch?v=G8uRgZQ6zio","Country":"United Kingdom","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/fMMrl8fD9gRCFJvsx0SuFwkEOop.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/qrtRKRzoNkf5vemO9tJ2Y4DrHxQ.jpg","Watch":"https://vidsrc.xyz/embed/movie/338952"},{"imdb_id":"tt3183660","Id":"17919","Genre":"Fantasy, Adventure","Actor":"Eddie Redmayne, Katherine Waterston, Alison Sudol","Director":"David Yates","Country":"United States, United Kingdom","Duration":132,"Release":"2016","Rating":56.762,"Cover":"https://img.cdno.my.id/cover/w_1200/h_500/fantastic-beast-and-where-to-find-them-17919.jpg","Title":"Fantastic Beasts and Where To Find Them","Watch":"https://vidsrc.xyz/embed/movie/259316","Thumbnail":"https://img.cdno.my.id/thumb/w_200/h_300/fantastic-beast-and-where-to-find-them-17919.jpg","Description":"In 1926, Newt Scamander arrives at the Magical Congress of the United States with a magically expanded briefcase, which houses a number of dangerous creatures and their habitats. When the creatures escape from the briefcase, it sends the American wizarding authorities after Newt, and threatens to strain even further the state of magical and non-magical relations.","Trailer":"https://www.youtube.com/watch?v=dMw1_akQ0h4","movieId":259316},{"imdb_id":"tt0087363","Id":927,"movieId":927,"Genre":"Fantasy, Horror, Comedy","Director":"Joe Dante","Actor":"Zach Galligan, Phoebe Cates, Hoyt Axton","Title":"Gremlins","Duration":106,"Release":"1984","Description":"When Billy Peltzer is given a strange but adorable pet named Gizmo for Christmas, he inadvertently breaks the three important rules of caring for a Mogwai, unleashing a horde of mischievous gremlins on a small town.","Rating":55.007,"Trailer":"https://www.youtube.com/watch?v=tHy_1qTZ0HY","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/sl3I9KD35GqWAI4NXBQ38mLEXEe.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/snWVsaFeodcftpSpztwhcbpypXG.jpg","Watch":"https://vidsrc.xyz/embed/movie/927"},{"imdb_id":"tt11947158","Id":682401,"movieId":682401,"Genre":"Action, Crime, Thriller","Director":"Mohit Suri","Actor":"John Abraham, Arjun Kapoor, Tara Sutaria","Title":"Ek Villain Returns","Duration":127,"Release":"2022","Description":"When a singer goes missing amid a serial killing spree, a cabbie and a businessman's son cross paths in a twisted tale where good and evil is blurred.","Rating":9.292,"Trailer":"https://www.youtube.com/watch?v=swPhyd0g6K8","Country":"India","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/4BqMeSSPaC7spmj4Zl7htiigCkV.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/dRP4OaISmTSybTkYOA4xhKfrEbA.jpg","Watch":"https://vidsrc.xyz/embed/movie/682401"},{"imdb_id":"tt1849718","Id":84858,"movieId":84858,"Genre":"Action, Crime, Drama","Director":"Karan Malhotra","Actor":"Hrithik Roshan, Sanjay Dutt, Priyanka Chopra Jonas","Title":"Agneepath","Duration":174,"Release":"2012","Description":"A young boy's father gets killed unexpectedly by a fierce crowd. After fifteen years, the boy comes back to seek his vengeance.","Rating":11.059,"Trailer":"https://www.youtube.com/watch?v=z0KPQstwMQw","Country":"India","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/vfnOUEiKaul9e3cw9eL2yv9W7Zn.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/7PP7NLNYyLVymJPHX3HiYHgAtsh.jpg","Watch":"https://vidsrc.xyz/embed/movie/84858"},{"imdb_id":"tt1017456","Id":19658,"movieId":19658,"Genre":"Drama, Action, Thriller, Crime","Director":"Abbas Alibhai Burmawalla, Mustan Alibhai Burmawalla","Actor":"Saif Ali Khan, Akshaye Khanna, Bipasha Basu","Title":"Race","Duration":161,"Release":"2008","Description":"The plot thickens around two horse-racing competitors when three beautiful women come into their lives and a murder is committed.","Rating":22.163,"Trailer":"https://www.youtube.com/watch?v=0vSsBXtD-EE","Country":"India","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/krMI3hRmlgKcuNc3XBWtl8APasR.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/7Qgfvndpje4oU7cUw3oYvT8dlyP.jpg","Watch":"https://vidsrc.xyz/embed/movie/19658"},{"imdb_id":"tt1375789","Id":44749,"movieId":44749,"Genre":"Thriller, Action, Adventure, Crime","Director":"Mustan Alibhai Burmawalla, Abbas Alibhai Burmawalla","Actor":"Saif Ali Khan, John Abraham, Deepika Padukone","Title":"Race 2","Duration":150,"Release":"2013","Description":"Ranveer Singh (Saif Ali Khan) travels to exotic locales and confronts the Turkish mafia on a mission to avenge the death of his lover Sonia in this action-packed sequel. In the process of seeking her killers, Ranveer crosses Armaan Mallick (John Abraham) and Aleena (Deepika Padukone) -- two of the most feared figures in the Turkish underworld. Meanwhile, Ranveer's loyal friend RD (Anil Kapoor) and his new partner Cherry (Amisha Patel) offer a helping hand in a world where love is cheap and trust is a luxury most agents can't afford.","Rating":10.225,"Trailer":"https://www.youtube.com/watch?v=9CwQ9PClSWk","Country":"India","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/FxfkEbgz7jQ8Jo2RViWQRd8sKT.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/9gczHHaJDAdcRxHBoTV7rskttmw.jpg","Watch":"https://vidsrc.xyz/embed/movie/44749"},{"imdb_id":"tt1075417","Id":13836,"movieId":13836,"Genre":"Adventure, Family, Fantasy, Science Fiction, Thriller, Action","Director":"Andy Fickman","Actor":"Dwayne Johnson, AnnaSophia Robb, Alexander Ludwig","Title":"Race to Witch Mountain","Duration":98,"Release":"2009","Description":"A taxi driver gets more than he bargained for when he picks up two teen runaways. Not only does the pair possess supernatural powers, but they're also trying desperately to escape people who have made them their targets.","Rating":27.176,"Trailer":"https://www.youtube.com/watch?v=SX2PWpcJlrY","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/tvlj31JuBspPSfdMfJszM6TXV6O.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/rlEQAN7vPn0mUUaHFjfgtUOQRtB.jpg","Watch":"https://vidsrc.xyz/embed/movie/13836"},{"imdb_id":"tt0072951","Id":14821,"movieId":14821,"Genre":"Adventure, Fantasy, Science Fiction, Family","Director":"John Hough","Actor":"Eddie Albert, Ray Milland, Donald Pleasence","Title":"Escape to Witch Mountain","Duration":97,"Release":"1975","Description":"Tia and Tony are two orphaned youngsters with extraordinary powers. Lucas Deranian poses as their uncle in order to get the kids into the clutches of Deranian's megalomaniacal boss, evil millionaire Aristotle Bolt, who wants to exploit them. Jason, a cynical widower, helps Tia and Tony escape to witch mountain, while at the same time Tia and Tony help Jason escape the pain of the loss of his wife.","Rating":19.267,"Trailer":"https://www.youtube.com/watch?v=nswae1s320k","Country":"United States","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/cXicoCiCfO6FDfv6ozwcfQCnhVW.jpg","Cover":"https://media.themoviedb.org/t/p/w533_and_h300_bestv2/3m45wVVHCX6iIKFHG6NBd3TkRHZ.jpg","Watch":"https://vidsrc.xyz/embed/movie/14821"},{"Id":235984,"movieId":235984,"imdb_id":"tt2215477","Genre":"Drama, Romance","Director":"Sanjay Leela Bhansali","Actor":"Ranveer Singh, Deepika Padukone, Richa Chadha","Title":"Goliyon Ki Raasleela Ram-Leela","Duration":155,"Release":"2013","Description":"Ran and Leela are passionately in love with each other. The only problem is that their respective clans have been enemies for 500 years.","Rating":10.177,"Trailer":"https://www.youtube.com/watch?v=2IpruWOb8ew","Country":"India","Thumbnail":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/6Pph0xbOJvNPhWh1fdeWGHppSPH.jpg","Cover":"https://image.tmdb.org/t/p/w300_and_h450_bestv2/lkjD3wgad9bJyGsVREYjmVbfX9S.jpg","Watch":"https://vidsrc.xyz/embed/movie/235984"}]`
    localStorage.setItem("movies", JSON.stringify([]));

      // ); */
      // const uData = [...data, ...d2];
      // localStorage.setItem("movies", "");
      // alert(d2.toString());
    })();
    // localStorage.setItem("movies", JSON.stringify([]));

    return () => {};
  }, []);

  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h3
          onClick={() => {
            setTab(1);
          }}
          style={{
            width: "50%",
            textAlign: "center",
            backgroundColor: `${tab == 1 ? "red" : "white"}`,
            border: `${tab == 2 ? "1px solid black" : ""}`,
            padding: "0.3rem",
            cursor: "pointer",
          }}
        >
          Watch History
        </h3>
        <h3
          onClick={() => {
            setTab(2);
          }}
          style={{
            width: "50%",
            border: `${tab == 1 ? "1px solid black" : ""}`,
            textAlign: "center",
            backgroundColor: `${tab == 2 ? "red" : "white"}`,
            padding: "0.3rem",
            cursor: "pointer",
          }}
        >
          Search History
        </h3>
      </div>
      {tab == 1 ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.8rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Watch History</h3>
            {history.length > 0 && (
              <button
                onClick={() => {
                  localStorage.setItem("movies", JSON.stringify([]));
                  setHistory([]);
                }}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "0.6rem",
                  cursor: "pointer",
                  borderRadius: "0.3rem",
                }}
              >
                Delete All
              </button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.9rem",
            }}
          >
            <input
              type="text"
              placeholder="Search History..."
              value={searchTerm}
              onChange={(e) => {
                setsearchTerm(e.target.value);
                if (e.target.value.trim().length == 0) {
                  setHistory(JSON.parse(localStorage.getItem("movies")) || []);
                }
              }}
              style={{
                padding: "0.5rem",
                borderRadius: "0.3rem",
                border: "2px solid black",
              }}
            />
            <button
              style={{
                backgroundColor: "lightsalmon",
                border: "none",
                cursor: "pointer",
                marginLeft: "3px",
                borderRadius: "4px",
              }}
              onClick={() => {
                if (searchTerm.length > 0) {
                  const searchResult = history1.filter((searchTerm1) =>
                    searchTerm1.Title.toLowerCase().includes(searchTerm)
                  );
                  if (searchResult.length > 0) setHistory(searchResult);
                }
              }}
            >
              Search
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.7rem",
              flexWrap: "wrap",
            }}
          >
            {history.length > 0 ? (
              history.reverse().map((ele, id) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <MovieCard
                      id={id}
                      setHoveredDiv={setHoveredDiv}
                      hoveredDiv={hoveredDiv}
                      data={ele}
                      getMovieDetail={getMovieDetail}
                    />
                    <button
                      onClick={() => {
                        deleteInidividualMovie(ele.Id);
                      }}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        position: "relative",
                        top: "-14px",
                        padding: "0.6rem",
                        borderRadius: "0.4rem",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            ) : (
              <h3>Empty!!</h3>
            )}
          </div>
        </>
      ) : (
        tab == 2 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <h3 style={{ textAlign: "center" }}>Search History</h3>
              {JSON.parse(localStorage.getItem("searches"))?.length > 0 && (
                <button
                  onClick={() => {
                    localStorage.setItem("searches", JSON.stringify([]));
                    setSearches([]);
                  }}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "0.6rem",
                    cursor: "pointer",
                    borderRadius: "0.3rem",
                  }}
                >
                  Delete All
                </button>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.4rem",
              }}
            >
              {JSON.parse(localStorage.getItem("searches"))?.length > 0 ? (
                searches.map((ele, id) => {
                  return (
                    <button
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        border: "none",
                        margin: 0,
                        marginBottom: "0.4rem",
                        backgroundColor: "orange",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                    >
                      {ele}
                    </button>
                  );
                })
              ) : (
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  No Search History Available!!!
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default History;
