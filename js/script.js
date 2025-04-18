document.addEventListener("DOMContentLoaded", function () {
  const appliedTheme = localStorage.getItem("appliedTheme") || "simple";
  document.body.classList.remove(
    "dark-theme",
    "simple-theme",
    "esport-theme",
    "cafe-theme",
    "kpop-theme"
  );
  document.body.classList.add(appliedTheme + "-theme");

  function updateLogoImages(theme) {
    const logoImg = document.querySelector(".logo img");
    if (logoImg) {
      logoImg.src =
        theme === "simple" ? "img/simple.png" : "img/" + theme + ".png";
    }
    const favIcon = document.querySelector('link[rel="icon"]');
    if (favIcon) {
      favIcon.href =
        theme === "simple" ? "img/simple2.png" : "img/" + theme + "2.png";
    }
    const footerLogoImg = document.querySelector("footer .footer-logo img");
    if (footerLogoImg) {
      footerLogoImg.src =
        theme === "simple" ? "img/simple.png" : "img/" + theme + ".png";
    }
  }
  updateLogoImages(appliedTheme);

  let isLoggedIn = false;
  let loggedInUser = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : {
        username: "utilisateur_test",
        email: "utilisateur@test.com",
        firstname: "Jean",
        lastname: "Dupont",
        games: ["Fortnite", "League of Legends", "Valorant"],
        registeredEvents: [],
        pastEvents: [
          {
            name: "Tournoi Rocket League",
            date: "15 MAI 2023",
            location: "Bordeaux, France",
            result: "2ème place",
          },
          {
            name: "Compétition Counter-Strike",
            date: "3 AVRIL 2023",
            location: "Bordeaux, France",
            result: "Participation",
          },
        ],
      };

  function checkLoginState() {
    if (localStorage.getItem("userLoggedIn") === "true") {
      isLoggedIn = true;
      updateUIForLoggedUser();
    }
  }

  function updateUIForLoggedUser() {
    const accountTabs = document.querySelector(".account-tabs");
    const loginContent = document.getElementById("login");
    const registerContent = document.getElementById("register");

    if (accountTabs && loginContent && registerContent) {
      accountTabs.innerHTML = `
                <div class="tab active" data-tab="profile">Mon Profil</div>
                <div class="tab" data-tab="edit-profile">Modifier Profil</div>
                <div class="tab" data-tab="my-events">Mes Événements</div>
                <div class="tab" data-tab="preferences">Préférence</div>
            `;

      const tabsContainer = document.querySelector(".tab-content").parentNode;

      document.querySelectorAll(".tab-content").forEach((el) => el.remove());

      const profileContent = document.createElement("div");
      profileContent.className = "tab-content active";
      profileContent.id = "profile";
      profileContent.innerHTML = `
                <div class="profile-info">
                    <h3>Bienvenue, ${loggedInUser.firstname} ${
        loggedInUser.lastname
      }</h3>
                    <div class="info-group">
                        <label>Nom d'utilisateur:</label>
                        <p>${loggedInUser.username}</p>
                    </div>
                    <div class="info-group">
                        <label>Email:</label>
                        <p>${loggedInUser.email}</p>
                    </div>
                    <div class="info-group">
                        <label>Jeux préférés:</label>
                        <p>${loggedInUser.games.join(", ")}</p>
                    </div>
                    <button id="logout-btn" class="btn btn-secondary btn-small margin-top">SE DÉCONNECTER</button>
                </div>
            `;

      const editProfileContent = document.createElement("div");
      editProfileContent.className = "tab-content";
      editProfileContent.id = "edit-profile";
      editProfileContent.innerHTML = `
                <form class="edit-profile-form">
                    <div class="form-group">
                        <label for="edit-username">Nom d'utilisateur</label>
                        <input type="text" id="edit-username" value="${
                          loggedInUser.username
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-email">Email</label>
                        <input type="email" id="edit-email" value="${
                          loggedInUser.email
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-firstname">Prénom</label>
                        <input type="text" id="edit-firstname" value="${
                          loggedInUser.firstname
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-lastname">Nom</label>
                        <input type="text" id="edit-lastname" value="${
                          loggedInUser.lastname
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-games">Jeux préférés (séparés par des virgules)</label>
                        <input type="text" id="edit-games" value="${loggedInUser.games.join(
                          ", "
                        )}" required>
                    </div>
                    <button type="submit" class="btn btn-secondary btn-small margin-top">ENREGISTRER LES MODIFICATIONS</button>
                </form>
            `;

      const myEventsContent = document.createElement("div");
      myEventsContent.className = "tab-content";
      myEventsContent.id = "my-events";

      let upcomingEventsHTML = "";
      if (loggedInUser.registeredEvents.length > 0) {
        upcomingEventsHTML = `
                    <div class="events-container profile-events">
                        ${loggedInUser.registeredEvents
                          .map(
                            (event) => `
                                <div class="event-profile-card">
                                    <button class="btn-desinscrire" data-event-name="${
                                      event.name
                                    }">Désinscrire</button>
                                    <div class="event-date">
                                        <span class="day">${
                                          event.date.split(" ")[0]
                                        }</span>
                                        <span class="month">${
                                          event.date.split(" ")[1]
                                        }</span>
                                    </div>
                                    <div class="event-info">
                                        <h4>${event.name}</h4>
                                        <p><i class="fas fa-map-marker-alt"></i> ${
                                          event.location
                                        }</p>
                                    </div>
                                </div>
                            `
                          )
                          .join("")}
                    </div>
                `;
      } else {
        upcomingEventsHTML = `<p>Vous n'êtes inscrit à aucun événement pour le moment.</p>`;
      }

      let pastEventsHTML = "";
      if (loggedInUser.pastEvents.length > 0) {
        pastEventsHTML = `
                    <div class="events-container profile-events">
                        ${loggedInUser.pastEvents
                          .map(
                            (event) => `
                                <div class="event-profile-card past-event">
                                    <div class="event-date">
                                        <span class="day">${
                                          event.date.split(" ")[0]
                                        }</span>
                                        <span class="month">${
                                          event.date.split(" ")[1]
                                        }</span>
                                    </div>
                                    <div class="event-info">
                                        <h4>${event.name}</h4>
                                        <p><i class="fas fa-map-marker-alt"></i> ${
                                          event.location
                                        }</p>
                                        <p><i class="fas fa-trophy"></i> ${
                                          event.result
                                        }</p>
                                    </div>
                                </div>
                            `
                          )
                          .join("")}
                    </div>
                `;
      } else {
        pastEventsHTML = `<p>Aucun événement passé à afficher.</p>`;
      }

      myEventsContent.innerHTML = `
                <div class="my-events-list">
                    <h3>Mes événements à venir</h3>
                    ${upcomingEventsHTML}
                    <a href="evenements.html" class="btn btn-secondary btn-small margin-top">VOIR LES ÉVÉNEMENTS DISPONIBLES</a>
                    
                    <h3 class="margin-top-large">Mes événements passés</h3>
                    ${pastEventsHTML}
                </div>
            `;

      tabsContainer.appendChild(profileContent);
      tabsContainer.appendChild(editProfileContent);
      tabsContainer.appendChild(myEventsContent);

      const preferencesContent = document.createElement("div");
      preferencesContent.className = "tab-content";
      preferencesContent.id = "preferences";
      preferencesContent.innerHTML = `
                <div class="preferences-container">
                    <h3 style="margin-bottom:30px;">Choisissez un thème</h3>
                    <form class="preferences-form">
                        <input type="hidden" id="selected-theme" name="theme" value="">
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="simple" style="color: #120D31; background-color: #7C90A0; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                Thème Simple
                            </div>
                        </div>
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="esport" style="color: #7C90A0; background-color: #120D31; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                Thème E‑sport
                            </div>
                        </div>
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="cafe" style="color: #B55119; background-color: #FDA15D; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                Thème Café
                            </div>
                        </div>
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="kpop" style="color: #FDA15D; background-color: #B55119; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                Thème K‑pop
                            </div>
                        </div>
                    </form>
                </div>
            `;
      tabsContainer.appendChild(preferencesContent);

      const themeOptions = document.querySelectorAll(".theme-option");
      let currentTheme = appliedTheme;
      document.getElementById("selected-theme").value = currentTheme;

      // Ajout de la bordure sur l'option active au chargement
      themeOptions.forEach((option) => {
        if (option.getAttribute("data-theme") === currentTheme) {
          option.style.border = "2px solid #fff";
        }
      });

      if (themeOptions.length > 0) {
        themeOptions.forEach((option) => {
          option.addEventListener("click", function () {
            const selected = this.getAttribute("data-theme");
            document.getElementById("selected-theme").value = selected;
            themeOptions.forEach(
              (opt) => (opt.style.border = "2px solid transparent")
            );
            this.style.border = "2px solid #fff";
            document.body.classList.remove(
              "simple-theme",
              "esport-theme",
              "cafe-theme",
              "kpop-theme"
            );
            document.body.classList.add(selected + "-theme");
            localStorage.setItem("appliedTheme", selected);
            currentTheme = selected;
            updateLogoImages(selected);
          });

          option.addEventListener("mouseenter", function () {
            const previewTheme = this.getAttribute("data-theme");
            document.body.classList.remove(
              "simple-theme",
              "esport-theme",
              "cafe-theme",
              "kpop-theme"
            );
            document.body.classList.add(previewTheme + "-theme");
          });

          option.addEventListener("mouseleave", function () {
            document.body.classList.remove(
              "simple-theme",
              "esport-theme",
              "cafe-theme",
              "kpop-theme"
            );
            document.body.classList.add(currentTheme + "-theme");
          });
        });

        const selectedThemeInput = document.getElementById("selected-theme");
        if (!selectedThemeInput.value) {
          const defaultOption = Array.from(themeOptions).find(
            (opt) => opt.getAttribute("data-theme") === "simple"
          );
          if (defaultOption) defaultOption.click();
        }
      }

      initializeTabs();

      document
        .getElementById("logout-btn")
        .addEventListener("click", function () {
          localStorage.removeItem("userLoggedIn");
          localStorage.removeItem("eventToRegister");
          window.location.reload();
        });

      document
        .querySelector(".edit-profile-form")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          loggedInUser.username =
            document.getElementById("edit-username").value;
          loggedInUser.email = document.getElementById("edit-email").value;
          loggedInUser.firstname =
            document.getElementById("edit-firstname").value;
          loggedInUser.lastname =
            document.getElementById("edit-lastname").value;
          loggedInUser.games = document
            .getElementById("edit-games")
            .value.split(",")
            .map((game) => game.trim());

          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

          alert("Profil mis à jour avec succès !");

          document.querySelector("#profile").innerHTML = `
                    <div class="profile-info">
                        <h3>Bienvenue, ${loggedInUser.firstname} ${
            loggedInUser.lastname
          }</h3>
                        <div class="info-group">
                            <label>Nom d'utilisateur:</label>
                            <p>${loggedInUser.username}</p>
                        </div>
                        <div class="info-group">
                            <label>Email:</label>
                            <p>${loggedInUser.email}</p>
                        </div>
                        <div class="info-group">
                            <label>Jeux préférés:</label>
                            <p>${loggedInUser.games.join(", ")}</p>
                        </div>
                        <button id="logout-btn" class="btn btn-secondary btn-small margin-top">SE DÉCONNECTER</button>
                    </div>
                    `;

          document
            .getElementById("logout-btn")
            .addEventListener("click", function () {
              localStorage.removeItem("userLoggedIn");
              localStorage.removeItem("eventToRegister");
              window.location.reload();
            });

          document.querySelector('.tab[data-tab="profile"]').click();
        });
    }
  }

  function initializeTabs() {
    const tabs = document.querySelectorAll(".tab");
    if (tabs.length > 0) {
      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          tabs.forEach((t) => t.classList.remove("active"));
          this.classList.add("active");

          const tabContents = document.querySelectorAll(".tab-content");
          tabContents.forEach((content) => content.classList.remove("active"));

          const tabId = this.getAttribute("data-tab");
          document.getElementById(tabId).classList.add("active");
        });
      });
    }
  }

  function updateMyEventsTab() {
    const myEventsContent = document.getElementById("my-events");
    if (!myEventsContent) return;
    let upcomingEventsHTML = "";
    if (loggedInUser.registeredEvents.length > 0) {
      upcomingEventsHTML = `
                <div class="events-container profile-events">
                    ${loggedInUser.registeredEvents
                      .map(
                        (event) => `
                            <div class="event-profile-card">
                                <div class="event-date">
                                    <span class="day">${
                                      event.date.split(" ")[0]
                                    }</span>
                                    <span class="month">${
                                      event.date.split(" ")[1]
                                    }</span>
                                </div>
                                <div class="event-info" style="flex: 1;">
                                    <h4>${event.name}</h4>
                                    <p><i class="fas fa-map-marker-alt"></i> ${
                                      event.location
                                    }</p>
                                </div>
                                <button class="btn-desinscrire" data-event-name="${
                                  event.name
                                }">Désinscrire</button>
                            </div>
                        `
                      )
                      .join("")}
                </div>
            `;
    } else {
      upcomingEventsHTML = `<p>Vous n'êtes inscrit à aucun événement pour le moment.</p>`;
    }
    let pastEventsHTML = "";
    if (loggedInUser.pastEvents.length > 0) {
      pastEventsHTML = `
                <div class="events-container profile-events">
                    ${loggedInUser.pastEvents
                      .map(
                        (event) => `
                            <div class="event-profile-card past-event">
                                <div class="event-date">
                                    <span class="day">${
                                      event.date.split(" ")[0]
                                    }</span>
                                    <span class="month">${
                                      event.date.split(" ")[1]
                                    }</span>
                                </div>
                                <div class="event-info">
                                    <h4>${event.name}</h4>
                                    <p><i class="fas fa-map-marker-alt"></i> ${
                                      event.location
                                    }</p>
                                    <p><i class="fas fa-trophy"></i> ${
                                      event.result
                                    }</p>
                                </div>
                            </div>
                        `
                      )
                      .join("")}
                </div>
            `;
    } else {
      pastEventsHTML = `<p>Aucun événement passé à afficher.</p>`;
    }
    myEventsContent.innerHTML = `
            <div class="my-events-list">
                <h3>Mes événements à venir</h3>
                ${upcomingEventsHTML}
                <a href="evenements.html" class="btn btn-secondary btn-small margin-top">VOIR LES ÉVÉNEMENTS DISPONIBLES</a>
                <h3 class="margin-top-large">Mes événements passés</h3>
                ${pastEventsHTML}
            </div>
        `;
    const desinscrireBtns = document.querySelectorAll(".btn-desinscrire");
    desinscrireBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const eventName = this.getAttribute("data-event-name");
        if (
          confirm(`Voulez-vous vraiment vous désinscrire de "${eventName}" ?`)
        ) {
          loggedInUser.registeredEvents = loggedInUser.registeredEvents.filter(
            (ev) => ev.name !== eventName
          );
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          alert(`Vous avez été désinscrit de "${eventName}"`);
          updateMyEventsTab();
        }
      });
    });
  }

  initializeTabs();

  checkLoginState();

  const loginForm = document.querySelector("#login form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.setItem("userLoggedIn", "true");
      window.location.reload();
    });
  }

  const registerForm = document.querySelector("#register form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const email = document.getElementById("register-email").value;
      loggedInUser = {
        username: username,
        email: email,
        firstname: username,
        lastname: "",
        games: [],
        registeredEvents: [],
        pastEvents: [],
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("userLoggedIn", "true");
      window.location.reload();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  function revealOnScroll() {
    const elements = document.querySelectorAll(
      ".feature, .news-item, .event, .cta-content"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  const elementsToAnimate = document.querySelectorAll(
    ".feature, .news-item, .event, .cta-content"
  );
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Merci pour votre message !");
      this.reset();
    });
  }

  const newsletterForm = document.querySelector(".footer-newsletter form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Merci de vous être abonné à notre newsletter !");
      this.reset();
    });
  }

  const inscriptionBtns = document.querySelectorAll(
    ".event-details .btn.btn-secondary"
  );
  if (inscriptionBtns.length > 0) {
    inscriptionBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const eventDetails = this.closest(".event-details");
        const eventName = eventDetails.querySelector("h3").textContent;
        const eventLocation = eventDetails
          .querySelector(".event-meta p:first-child")
          .textContent.trim()
          .replace(/^[^\s]+\s/, "");
        const eventDateElement =
          this.closest(".event-card").querySelector(".event-date");
        const eventDate = eventDateElement
          ? `${eventDateElement.querySelector(".day").textContent} ${
              eventDateElement.querySelector(".month").textContent
            }`
          : "30 JUIN";

        if (!localStorage.getItem("userLoggedIn")) {
          localStorage.setItem("eventToRegister", eventName);
          localStorage.setItem("eventDate", eventDate);
          localStorage.setItem("eventLocation", eventLocation);
          window.location.href = "compte.html#register";
        } else {
          const alreadyRegistered = loggedInUser.registeredEvents.some(
            (ev) => ev.name === eventName
          );
          if (alreadyRegistered) {
            alert(`Attention, tu es déjà inscrit à "${eventName}" !`);
          } else {
            loggedInUser.registeredEvents.push({
              name: eventName,
              date: eventDate,
              location: eventLocation,
              team: "",
            });
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            alert(`Inscription à "${eventName}" réussie !`);
            updateMyEventsTab();
          }
        }
      });
    });
  }

  if (
    window.location.href.includes("compte.html#register") ||
    window.location.href.includes("compte.html#login")
  ) {
    if (localStorage.getItem("eventToRegister")) {
      const tabSelector = window.location.href.includes("#register")
        ? "register"
        : "login";
      const registerTab = document.querySelector(
        `.tab[data-tab="${tabSelector}"]`
      );
      if (registerTab) {
        registerTab.click();

        const message = document.createElement("div");
        message.className = "event-registration-info";
        message.textContent =
          "Inscription pour l'événement : " +
          localStorage.getItem("eventToRegister");
        message.style.backgroundColor = "var(--primary-color)";
        message.style.color = "var(--light-color)";
        message.style.padding = "10px";
        message.style.borderRadius = "4px";
        message.style.marginBottom = "15px";

        const formSelector =
          tabSelector === "register" ? "#register form" : "#login form";
        const registerForm = document.querySelector(formSelector);
        if (registerForm) {
          registerForm.prepend(message);
        }
      }
    }
  }

  if (document.getElementById("my-events")) {
    updateMyEventsTab();
  }

  const burger = document.querySelector(".burger-menu");
  const navUl = document.querySelector("header nav ul");
  const header = document.querySelector("header");

  if (burger) {
    burger.addEventListener("click", function () {
      navUl.classList.toggle("active");
    });
  }

  window.addEventListener("scroll", function () {
    // Si le menu est ouvert, le fermer avec animation
    if (navUl.classList.contains("active")) {
      navUl.classList.remove("active"); // ferme le menu
      header.classList.add("closing"); // lance l'animation
      setTimeout(() => {
        header.classList.remove("closing");
      }, 500); // retire la classe après la durée de l'animation (500ms ici)
    }

    // Modification de l'effet "scrolled" pour le header
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ===== Internationalisation =====
  const translations = {
    fr: {
      // … vos clés existantes
      feature1Title: "Tournois",
      feature1Desc: "Participez à nos tournois réguliers sur différents jeux",
      feature2Title: "Communauté",
      feature2Desc: "Rejoignez notre communauté active de joueurs",
      feature3Title: "Compétitions",
      feature3Desc: "Suivez les actualités des compétitions esportives",

      newsSectionTitle: "Actualités",
      news1Title: "Nouveau tournoi League of Legends",
      news1Desc:
        "Inscrivez-vous à notre prochain tournoi qui aura lieu le weekend prochain.",
      news1ReadMore: "Lire plus",
      news2Title: "Résultats du championnat Valorant",
      news2Desc: "Découvrez les équipes qualifiées pour les playoff braquet.",
      news2ReadMore: "Lire plus",
      news3Title: "Partenariat avec ESL",
      news3Desc:
        "Spotify devient partenaire officiel des compétitions ESL en France.",
      news3ReadMore: "Lire plus",
      newsSeeAll: "Voir toutes les actualités",

      eventsSectionTitle: "Événements à venir",
      event1Name: "Tournoi Call of Duty",
      event1Location: "Bordeaux, France",
      event1More: "En savoir plus",
      event2Name: "Championnat Fortnite",
      event2Location: "Bordeaux, France",
      event2More: "En savoir plus",
      event3Name: "Compétition FIFA 23",
      event3Location: "Bordeaux, France",
      event3More: "En savoir plus",
      eventsSeeAll: "Voir tous les événements",

      ctaTitle: "Rejoignez notre Discord",
      ctaDesc: "Participez à notre communauté et ne manquez aucun événement !",
      ctaButton: "REJOINDRE MAINTENANT",

      partnersSectionTitle: "Nos Partenaires",

      footerLinksTitle: "Liens utiles",
      navFaq: "FAQ",

      newsletterTitle: "Newsletter",
      newsletterDesc: "Abonnez‑vous pour recevoir nos dernières actualités",
      newsletterButton: "S'ABONNER",
    },
    en: {
      navHome: "Home",
      navAbout: "About",
      navNews: "News",
      navEvents: "Events",
      navContact: "Contact",
      navAccount: "Account",
      navFaq: "FAQ",

      heroTitle: "Welcome to Chroma",
      heroSubtitle: "The community for passionate gamers",
      heroCta: "DISCOVER",

      feature1Title: "Tournaments",
      feature1Desc: "Join our regular tournaments across various games",
      feature2Title: "Community",
      feature2Desc: "Become part of our active gaming community",
      feature3Title: "Competitions",
      feature3Desc: "Follow the latest esports competitions",

      newsSectionTitle: "News",
      news1Title: "New League of Legends Tournament",
      news1Desc: "Sign up for our upcoming tournament happening next weekend.",
      news1ReadMore: "Read more",
      news2Title: "Valorant Championship Results",
      news2Desc:
        "Discover the qualified teams and current standings after intense matches.",
      news2ReadMore: "Read more",
      news3Title: "Partnership with ESL",
      news3Desc:
        "Chroma becomes the official partner of ESL competitions in France.",
      news3ReadMore: "Read more",
      newsSeeAll: "See all news",

      eventsSectionTitle: "Upcoming Events",
      event1Name: "Call of Duty Tournament",
      event1Location: "Bordeaux, France",
      event1More: "Learn more",
      event2Name: "Fortnite Championship",
      event2Location: "Bordeaux, France",
      event2More: "Learn more",
      event3Name: "FIFA 23 Competition",
      event3Location: "Bordeaux, France",
      event3More: "Learn more",
      eventsSeeAll: "See all events",

      ctaTitle: "Join our Discord",
      ctaDesc: "Be part of our community and never miss an event!",
      ctaButton: "JOIN NOW",

      partnersSectionTitle: "Our Partners",

      footerLinksTitle: "Useful Links",
      newsletterTitle: "Newsletter",
      newsletterDesc: "Subscribe to receive our latest updates",
      newsletterButton: "SUBSCRIBE",
    },
    ko: {
      navHome: "홈",
      navAbout: "소개",
      navNews: "뉴스",
      navEvents: "이벤트",
      navContact: "연락처",
      navAccount: "계정",
      navFaq: "자주 묻는 질문",

      heroTitle: "크로마에 오신 것을 환영합니다",
      heroSubtitle: "열정적인 게이머를 위한 커뮤니티",
      heroCta: "발견하기",

      feature1Title: "토너먼트",
      feature1Desc: "다양한 게임에서 정기 토너먼트에 참여하세요",
      feature2Title: "커뮤니티",
      feature2Desc: "활발한 게이머 커뮤니티에 참여하세요",
      feature3Title: "대회",
      feature3Desc: "최신 e스포츠 대회를 확인하세요",

      newsSectionTitle: "뉴스",
      news1Title: "새로운 리그 오브 레전드 토너먼트",
      news1Desc: "다음 주말에 열리는 토너먼트에 등록하세요.",
      news1ReadMore: "더 보기",
      news2Title: "발로란트 챔피언십 결과",
      news2Desc: "치열한 경기 후 자격을 얻은 팀과 순위를 확인하세요.",
      news2ReadMore: "더 보기",
      news3Title: "ESL과의 파트너십",
      news3Desc: "Chroma가 프랑스 ESL 대회의 공식 파트너가 됩니다.",
      news3ReadMore: "더 보기",
      newsSeeAll: "모든 뉴스 보기",

      eventsSectionTitle: "다가오는 이벤트",
      event1Name: "콜 오브 듀티 토너먼트",
      event1Location: "보르도, 프랑스",
      event1More: "자세히 보기",
      event2Name: "포트나이트 챔피언십",
      event2Location: "보르도, 프랑스",
      event2More: "자세히 보기",
      event3Name: "FIFA 23 대회",
      event3Location: "보르도, 프랑스",
      event3More: "자세히 보기",
      eventsSeeAll: "모든 이벤트 보기",

      ctaTitle: "우리 디스코드에 참여하세요",
      ctaDesc: "커뮤니티에 참여하고 어떤 이벤트도 놓치지 마세요!",
      ctaButton: "지금 참여하기",

      partnersSectionTitle: "파트너사",

      footerLinksTitle: "유용한 링크",
      newsletterTitle: "뉴스레터",
      newsletterDesc: "최신 소식을 받아보려면 구독하세요",
      newsletterButton: "구독하기",
    },
  };

  let currentLang = localStorage.getItem("lang") || "fr";

  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    localStorage.setItem("lang", lang);
  }

  document.querySelectorAll(".lang-switch").forEach((btn) => {
    btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
  });

  applyTranslations(currentLang);
});
