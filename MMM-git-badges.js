Module.register("MMM-git-badges", {
  	// Default module config.
  	defaults: {
    	conf: [{"user":"MichMich","repo":"MagicMirror","service":"github","fields":["issues","pull_requests","last_commit"]},
    	{"user":"NikolasRupp","repo":"MMM-weconnectid","service":"github","fields":["issues","pull_requests","last_commit"]},
    	{"user":"NikolasRupp","repo":"MMM-weconnectid-alt","service":"github","fields":["issues","pull_requests","last_commit"]}],
    	height: "20px",
    	minWidth: "150px",
    	updateInterval: 600000,
	},

	getStyles: function() {
		return [
			'font-awesome.css',
			this.file('MMM-git-badges.css'),
		]
	},

	getTranslations: function() {
		return {
			de: "translations/de.json",
			en: "translations/en.json"
		}
	},

  	// Override dom generator.
  	getDom: function () {
    	var wrapper = document.createElement("table");
    	wrapper.id = "table_git"
		for (i = 0; i < this.config.conf.length; i++) {
			var tr = document.createElement("tr");
			wrapper.appendChild(tr)
			var td = document.createElement("td")
			if (i == 0 || (i > 0 && this.config.conf[i-1]["user"] != this.config.conf[i]["user"])) {
				td.innerHTML = '<p>' + this.config.conf[i]["user"] + '&nbsp</p>'
			} else {
				td.innerHTML = '<p></p>'
			}
			td.id = "name_git"
			tr.appendChild(td);
			var td = document.createElement("td")
			td.innerHTML = '<p>' + this.config.conf[i]["repo"] + '&nbsp</p>'
			td.id = "name_git"
			tr.appendChild(td);
			for (j = 0; j < this.config.conf[i]["fields"].length; j++){
				source = ""
				if (this.config.conf[i]["service"] == "github"){
					switch (this.config.conf[i]["fields"][j]) {
						case "license":
							source = "https://img.shields.io/github/license/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "release":
							source = "https://img.shields.io/github/v/release/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "downloads":
							source = "https://img.shields.io/github/downloads/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"] + "/total"
							break;
						case "release_date":
							source = "https://img.shields.io/github/release-date/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "forks":
							source = "https://img.shields.io/github/forks/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "stars":
							source = "https://img.shields.io/github/stars/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "watchers":
							source = "https://img.shields.io/github/watchers/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "issues":
							source = "https://img.shields.io/github/issues/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "pull_requests":
							source = "https://img.shields.io/github/issues-pr/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "commit_activity":
							source = "https://img.shields.io/github/commit-activity/m/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "last_commit":
							source = "https://img.shields.io/github/last-commit/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "contributors":
							source = "https://img.shields.io/github/contributors/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "files":
							source = "https://img.shields.io/github/directory-file-count/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "size":
							source = "https://img.shields.io/github/repo-size/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
					}
				} else if (this.config.conf[i]["service"] == "gitlab"){
					switch (this.config.conf[i]["fields"][j]) {
						case "license":
							source = "https://img.shields.io/gitlab/license/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "release":
							source = "https://img.shields.io/gitlab/v/release/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "forks":
							source = "https://img.shields.io/gitlab/forks/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "stars":
							source = "https://img.shields.io/gitlab/stars/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "issues":
							source = "https://img.shields.io/gitlab/issues/open/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "merge_requests":
							source = "https://img.shields.io/gitlab/merge-requests/open/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "last_commit":
							source = "https://img.shields.io/gitlab/last-commit/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
						case "contributors":
							source = "https://img.shields.io/gitlab/contributors/" + this.config.conf[i]["user"] + "/" + this.config.conf[i]["repo"]
							break;
					}
				}
				var td = document.createElement("td")
				td.style.minWidth = this.config.minWidth
				if (source != "") {
					td.innerHTML = '<img id = image_git src=' + source + ' style="height:' + this.config.height + ';">'
				} else {
					td.innerHTML = '<p>' + this.config.conf[i]["fields"][j] + ' not found</p>'
					td.id = "name_git"
				}
				tr.appendChild(td);
			}
		}
		return wrapper
  	},

  	start: function() {
		var self = this;
		var config = this.config
		setInterval(function() {
            self.updateDom();
    	}, this.config.updateInterval);
  	},

  	socketNotificationReceived: function(notification, payload) {
  		var self = this;
		Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
  	},
});
