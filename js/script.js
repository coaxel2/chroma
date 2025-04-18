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
});
