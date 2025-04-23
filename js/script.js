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
        theme === "simple" ? "../img/simple.png" : "../img/" + theme + ".png";
    }
    const favIcon = document.querySelector('link[rel="icon"]');
    if (favIcon) {
      favIcon.href =
        theme === "simple" ? "../img/simple2.png" : "../img/" + theme + "2.png";
    }
    const footerLogoImg = document.querySelector("footer .footer-logo img");
    if (footerLogoImg) {
      footerLogoImg.src =
        theme === "simple" ? "../img/simple.png" : "../img/" + theme + ".png";
    }
  }
  updateLogoImages(appliedTheme);

  let isLoggedIn = false;

  const lang = document.documentElement.lang || "fr";
  const currentLang = document.documentElement.lang || "fr";
  const storedUser = localStorage.getItem("loggedInUser");
  if (storedUser) {
    let user = JSON.parse(storedUser);
    // Met à jour la langue du user sans supprimer ses informations
    if (!user.lang || user.lang !== currentLang) {
      user.lang = currentLang;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }

  let defaultUser;
  if (lang === "en") {
    // Laisser vide pour remplir manuellement vos informations
    defaultUser = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      games: [],
      registeredEvents: [],
      pastEvents: [],
      lang: "en",
    };
  } else if (lang === "ko") {
    // Laisser vide pour remplir manuellement vos informations
    defaultUser = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      games: [],
      registeredEvents: [],
      pastEvents: [],
      lang: "ko",
    };
  } else if (lang === "fr") {
    // Laisser vide pour remplir manuellement vos informations
    defaultUser = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      games: [],
      registeredEvents: [],
      pastEvents: [],
      lang: "fr",
    };
  }
  let loggedInUser = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : defaultUser;

  function getAccountTranslations() {
    const lang = document.documentElement.lang || "fr";
    const translations = {
      profileWelcome: { fr: "Bienvenue", en: "Welcome", ko: "환영합니다" },
      usernameLabel: {
        fr: "Nom d'utilisateur:",
        en: "Username:",
        ko: "사용자 이름:",
      },
      emailLabel: { fr: "Email:", en: "Email:", ko: "이메일:" },
      favoriteGamesLabel: {
        fr: "Jeux préférés:",
        en: "Favorite Games:",
        ko: "선호하는 게임:",
      },
      logoutButton: { fr: "SE DÉCONNECTER", en: "LOG OUT", ko: "로그아웃" },
      editProfileTitleLabel: {
        fr: "Nom d'utilisateur",
        en: "Username",
        ko: "사용자 이름",
      },
      editEmailLabel: { fr: "Email", en: "Email", ko: "이메일" },
      editFirstnameLabel: { fr: "Prénom", en: "First Name", ko: "이름" },
      editLastnameLabel: { fr: "Nom", en: "Last Name", ko: "성" },
      editGamesLabel: {
        fr: "Jeux préférés (séparés par des virgules)",
        en: "Favorite Games (comma separated)",
        ko: "선호하는 게임(콤마로 구분)",
      },
      saveChangesButton: {
        fr: "ENREGISTRER LES MODIFICATIONS",
        en: "SAVE CHANGES",
        ko: "수정 사항 저장",
      },
      myEventsUpcomingTitle: {
        fr: "Mes événements à venir",
        en: "My Upcoming Events",
        ko: "예정된 이벤트",
      },
      myEventsAvailableLink: {
        fr: "VOIR LES ÉVÉNEMENTS DISPONIBLES",
        en: "VIEW AVAILABLE EVENTS",
        ko: "이벤트 보기",
      },
      myEventsPastTitle: {
        fr: "Mes événements passés",
        en: "My Past Events",
        ko: "지난 이벤트",
      },
      unregisterButton: {
        fr: "Désinscrire",
        en: "Unregister",
        ko: "취소",
      },
      updateSuccessMessage: {
        fr: "Profil mis à jour avec succès !",
        en: "Profile updated successfully!",
        ko: "프로필이 성공적으로 업데이트되었습니다!",
      },
      eventUnregisterMessage: {
        fr: (name) => `Vous avez été désinscrit de "${name}"`,
        en: (name) => `You have been unregistered from "${name}"`,
        ko: (name) => `"${name}" 이벤트에서 취소되었습니다`,
      },
      alreadyRegisteredMessage: {
        fr: (name) => `Attention, tu es déjà inscrit à "${name}" !`,
        en: (name) => `Warning, you are already registered for "${name}"!`,
        ko: (name) => `"${name}" 이벤트에 이미 등록되어 있습니다!`,
      },
      eventRegisterSuccessMessage: {
        fr: (name) => `Inscription à "${name}" réussie !`,
        en: `Registration for "${name}" successful!`,
        ko: `"${name}" 이벤트 등록이 완료되었습니다!`,
      },
      chooseTheme: {
        fr: "Choisissez un thème",
        en: "Choose a theme",
        ko: "테마를 선택하세요",
      },
      themeSimple: {
        fr: "Thème Simple",
        en: "Simple Theme",
        ko: "심플 테마",
      },
      themeEsport: {
        fr: "Thème E‑sport",
        en: "Esport Theme",
        ko: "e스포츠 테마",
      },
      themeCafe: {
        fr: "Thème Café",
        en: "Cafe Theme",
        ko: "카페 테마",
      },
      themeKpop: {
        fr: "Thème K‑pop",
        en: "K‑pop Theme",
        ko: "K‑pop 테마",
      },
      upcomingEventsEmpty: {
        fr: "Aucun événement à venir.",
        en: "No upcoming events.",
        ko: "예정된 이벤트 없음.",
      },
      preferencesLabel: {
        fr: "Préférence",
        en: "Preferences",
        ko: "환경설정",
      },
    };
    return {
      lang,
      profileWelcome:
        translations.profileWelcome[lang] || translations.profileWelcome.fr,
      usernameLabel:
        translations.usernameLabel[lang] || translations.usernameLabel.fr,
      emailLabel: translations.emailLabel[lang] || translations.emailLabel.fr,
      favoriteGamesLabel:
        translations.favoriteGamesLabel[lang] ||
        translations.favoriteGamesLabel.fr,
      logoutButton:
        translations.logoutButton[lang] || translations.logoutButton.fr,
      editProfileTitleLabel:
        translations.editProfileTitleLabel[lang] ||
        translations.editProfileTitleLabel.fr,
      editEmailLabel:
        translations.editEmailLabel[lang] || translations.editEmailLabel.fr,
      editFirstnameLabel:
        translations.editFirstnameLabel[lang] ||
        translations.editFirstnameLabel.fr,
      editLastnameLabel:
        translations.editLastnameLabel[lang] ||
        translations.editLastnameLabel.fr,
      editGamesLabel:
        translations.editGamesLabel[lang] || translations.editGamesLabel.fr,
      saveChangesButton:
        translations.saveChangesButton[lang] ||
        translations.saveChangesButton.fr,
      myEventsUpcomingTitle:
        translations.myEventsUpcomingTitle[lang] ||
        translations.myEventsUpcomingTitle.fr,
      myEventsAvailableLink:
        translations.myEventsAvailableLink[lang] ||
        translations.myEventsAvailableLink.fr,
      myEventsPastTitle:
        translations.myEventsPastTitle[lang] ||
        translations.myEventsPastTitle.fr,
      unregisterButton:
        translations.unregisterButton[lang] || translations.unregisterButton.fr,
      updateSuccessMessage:
        translations.updateSuccessMessage[lang] ||
        translations.updateSuccessMessage.fr,
      eventUnregisterMessage:
        translations.eventUnregisterMessage[lang] ||
        translations.eventUnregisterMessage.fr,
      alreadyRegisteredMessage:
        translations.alreadyRegisteredMessage[lang] ||
        translations.alreadyRegisteredMessage.fr,
      eventRegisterSuccessMessage:
        translations.eventRegisterSuccessMessage[lang] ||
        translations.eventRegisterSuccessMessage.fr,
      chooseTheme:
        translations.chooseTheme[lang] || translations.chooseTheme.fr,
      themeSimple:
        translations.themeSimple[lang] || translations.themeSimple.fr,
      themeEsport:
        translations.themeEsport[lang] || translations.themeEsport.fr,
      themeCafe: translations.themeCafe[lang] || translations.themeCafe.fr,
      themeKpop: translations.themeKpop[lang] || translations.themeKpop.fr,
      upcomingEventsEmpty:
        translations.upcomingEventsEmpty[lang] ||
        translations.upcomingEventsEmpty.fr,
      preferencesLabel:
        translations.preferencesLabel[lang] || translations.preferencesLabel.fr,
    };
  }

  function checkLoginState() {
    if (localStorage.getItem("userLoggedIn") === "true") {
      isLoggedIn = true;
      updateUIForLoggedUser();
    }
  }

  function updateUIForLoggedUser() {
    const langTexts = getAccountTranslations();
    const accountTabs = document.querySelector(".account-tabs");
    const loginContent = document.getElementById("login");
    const registerContent = document.getElementById("register");

    if (accountTabs && loginContent && registerContent) {
      accountTabs.innerHTML = `
                <div class="tab active" data-tab="profile">${langTexts.profileWelcome}, ${loggedInUser.firstname} ${loggedInUser.lastname}</div>
                <div class="tab" data-tab="edit-profile">${langTexts.editProfileTitleLabel}</div>
                <div class="tab" data-tab="my-events">${langTexts.myEventsUpcomingTitle}</div>
                <div class="tab" data-tab="preferences">${langTexts.preferencesLabel}</div>
            `;

      const tabsContainer = document.querySelector(".tab-content").parentNode;
      document.querySelectorAll(".tab-content").forEach((el) => el.remove());

      const profileContent = document.createElement("div");
      profileContent.className = "tab-content active";
      profileContent.id = "profile";
      profileContent.innerHTML = `
                <div class="profile-info">
                    <h3>${langTexts.profileWelcome}, ${
        loggedInUser.firstname
      } ${loggedInUser.lastname}</h3>
                    <div class="info-group">
                        <label>${langTexts.usernameLabel}</label>
                        <p>${loggedInUser.username}</p>
                    </div>
                    <div class="info-group">
                        <label>${langTexts.emailLabel}</label>
                        <p>${loggedInUser.email}</p>
                    </div>
                    <div class="info-group">
                        <label>${langTexts.favoriteGamesLabel}</label>
                        <p>${loggedInUser.games.join(", ")}</p>
                    </div>
                    <button id="logout-btn" class="btn btn-secondary btn-small margin-top">${
                      langTexts.logoutButton
                    }</button>
                </div>
            `;

      const editProfileContent = document.createElement("div");
      editProfileContent.className = "tab-content";
      editProfileContent.id = "edit-profile";
      editProfileContent.innerHTML = `
                <form class="edit-profile-form">
                    <div class="form-group">
                        <label for="edit-username">${
                          langTexts.editProfileTitleLabel
                        }</label>
                        <input type="text" id="edit-username" value="${
                          loggedInUser.username
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-email">${
                          langTexts.editEmailLabel
                        }</label>
                        <input type="email" id="edit-email" value="${
                          loggedInUser.email
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-firstname">${
                          langTexts.editFirstnameLabel
                        }</label>
                        <input type="text" id="edit-firstname" value="${
                          loggedInUser.firstname
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-lastname">${
                          langTexts.editLastnameLabel
                        }</label>
                        <input type="text" id="edit-lastname" value="${
                          loggedInUser.lastname
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-games">${
                          langTexts.editGamesLabel
                        }</label>
                        <input type="text" id="edit-games" value="${loggedInUser.games.join(
                          ", "
                        )}" required>
                    </div>
                    <button type="submit" class="btn btn-secondary btn-small margin-top">${
                      langTexts.saveChangesButton
                    }</button>
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
                                    }">${langTexts.unregisterButton}</button>
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
        upcomingEventsHTML = `<p>${langTexts.myEventsUpcomingTitle} : ${langTexts.upcomingEventsEmpty}</p>`;
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
        pastEventsHTML = `<p>${langTexts.myEventsPastTitle} : Aucun événement passé à afficher.</p>`;
      }

      myEventsContent.innerHTML = `
                <div class="my-events-list">
                    <h3>${langTexts.myEventsUpcomingTitle}</h3>
                    ${upcomingEventsHTML}
                    <a href="evenements.html" class="btn btn-secondary btn-small margin-top">${langTexts.myEventsAvailableLink}</a>
                    
                    <h3 class="margin-top-large">${langTexts.myEventsPastTitle}</h3>
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
                    <h3 style="margin-bottom:30px;">${
                      langTexts.chooseTheme || "Choisissez un thème"
                    }</h3>
                    <form class="preferences-form">
                        <input type="hidden" id="selected-theme" name="theme" value="">
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="simple" style="color: #120D31; background-color: #7C90A0; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                ${langTexts.themeSimple || "Thème Simple"}
                            </div>
                        </div>
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="esport" style="color: #7C90A0; background-color: #120D31; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                ${langTexts.themeEsport || "Thème E‑sport"}
                            </div>
                        </div>
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="cafe" style="color: #B55119; background-color: #FDA15D; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                ${langTexts.themeCafe || "Thème Café"}
                            </div>
                        </div>
                        <div class="form-group" style="text-align:center;">
                            <div class="theme-option" data-theme="kpop" style="color: #FDA15D; background-color: #B55119; display: block; width: 150px; height: 50px; line-height: 50px; margin: 0 auto; border-radius: 8px; cursor:pointer;">
                                ${langTexts.themeKpop || "Thème K‑pop"}
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

          alert(langTexts.updateSuccessMessage);

          document.querySelector("#profile").innerHTML = `
                    <div class="profile-info">
                        <h3>${langTexts.profileWelcome}, ${
            loggedInUser.firstname
          } ${loggedInUser.lastname}</h3>
                        <div class="info-group">
                            <label>${langTexts.usernameLabel}</label>
                            <p>${loggedInUser.username}</p>
                        </div>
                        <div class="info-group">
                            <label>${langTexts.emailLabel}</label>
                            <p>${loggedInUser.email}</p>
                        </div>
                        <div class="info-group">
                            <label>${langTexts.favoriteGamesLabel}</label>
                            <p>${loggedInUser.games.join(", ")}</p>
                        </div>
                        <button id="logout-btn" class="btn btn-secondary btn-small margin-top">${
                          langTexts.logoutButton
                        }</button>
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
    const langTexts = getAccountTranslations();
    const lang = document.documentElement.lang || "fr";
    const eventTranslations = {
      rocketLeague: {
        fr: "Tournoi Rocket League",
        en: "Rocket League Tournament",
        ko: "Rocket League 토너먼트",
      },
      counterStrike: {
        fr: "Compétition Counter-Strike",
        en: "Counter-Strike Competition",
        ko: "Counter-Strike 대회",
      },
      // Ajoutez d'autres événements si nécessaire
    };
    const myEventsContent = document.getElementById("my-events");
    if (!myEventsContent) return;
    let upcomingEventsHTML = "";
    if (loggedInUser.registeredEvents.length > 0) {
      upcomingEventsHTML = `
                <div class="events-container profile-events">
                    ${loggedInUser.registeredEvents
                      .map((event) => {
                        const translatedName =
                          event.key && eventTranslations[event.key]
                            ? eventTranslations[event.key][lang] || event.name
                            : event.name;
                        return `
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
                                    <h4>${translatedName}</h4>
                                    <p><i class="fas fa-map-marker-alt"></i> ${
                                      event.location
                                    }</p>
                                </div>
                                <button class="btn-desinscrire" data-event-name="${translatedName}">${
                          langTexts.unregisterButton
                        }</button>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            `;
    } else {
      upcomingEventsHTML = `<p>${langTexts.myEventsUpcomingTitle} : ${langTexts.upcomingEventsEmpty}</p>`;
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
      pastEventsHTML = `<p>${langTexts.myEventsPastTitle} : Aucun événement passé à afficher.</p>`;
    }
    myEventsContent.innerHTML = `
            <div class="my-events-list">
                <h3>${langTexts.myEventsUpcomingTitle}</h3>
                ${upcomingEventsHTML}
                <a href="evenements.html" class="btn btn-secondary btn-small margin-top">${langTexts.myEventsAvailableLink}</a>
                <h3 class="margin-top-large">${langTexts.myEventsPastTitle}</h3>
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
          alert(langTexts.eventUnregisterMessage(eventName));
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
        const langTexts = getAccountTranslations();
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

        // Déterminer une clé d'événement si possible
        let eventKey = "";
        if (eventName.toLowerCase().includes("rocket")) {
          eventKey = "rocketLeague";
        } else if (eventName.toLowerCase().includes("counter")) {
          eventKey = "counterStrike";
        }

        if (!localStorage.getItem("userLoggedIn")) {
          localStorage.setItem("eventToRegister", eventName);
          localStorage.setItem("eventDate", eventDate);
          localStorage.setItem("eventLocation", eventLocation);
          window.location.href = "compte.html#register";
        } else {
          const alreadyRegistered = loggedInUser.registeredEvents.some(
            (ev) => ev.key === eventKey
          );
          if (alreadyRegistered) {
            alert(langTexts.alreadyRegisteredMessage(eventName));
          } else {
            loggedInUser.registeredEvents.push({
              key: eventKey, // stocke la clé pour la traduction
              name: eventName,
              date: eventDate,
              location: eventLocation,
              team: "",
            });
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            alert(langTexts.eventRegisterSuccessMessage(eventName));
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
    burger.addEventListener("click", function (e) {
      e.stopPropagation(); // éviter que le clic ne se propage
      navUl.classList.toggle("active");
    });
  }

  // Fermer le menu burger si l'utilisateur clique en dehors (sauf sur le menu de navigation)
  document.addEventListener("click", function (e) {
    if (navUl.classList.contains("active") && !e.target.closest("header nav")) {
      navUl.classList.remove("active");
    }
  });

  // À placer une seule fois à la fin de DOMContentLoaded
  const langSwitchAnchors = document.querySelectorAll(".lang-switch");
  const pageLang = document.documentElement.lang || "fr";

  // Définir la classe active initialement selon la langue de la page
  langSwitchAnchors.forEach((anchor) => {
    if (anchor.dataset.lang === pageLang) {
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  });
});
