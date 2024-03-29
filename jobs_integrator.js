  class JobRenderService {
	static #company = document.currentScript.getAttribute('company')
  	static #color = document.currentScript.getAttribute('color')

    static #renderJobs = (jobs) => {

        if (this.#color) {
          let styleElem = document.querySelector('style') || document.head.appendChild(document.createElement("style"))
          styleElem.innerHTML += `tr.jobs-data-row td:last-child:after { background-color: ${this.#color} !important; }`;
        }
        const headers = ['Title', 'Locations']
        const div = document.createElement('div')
        div.classList.add('ats-div')
        const table = document.createElement('table')
        table.classList.add('jobs-table')
        let tr = document.createElement('tr')
        tr.classList.add('jobs-table-header')
        headers.forEach(header => {
            let th = document.createElement('th')
            th.innerHTML = header
            if (this.#color) th.style.backgroundColor = this.#color
            th.classList.add(`${header.toLowerCase()}`)
            tr.appendChild(th)
        })
        table.appendChild(tr)
        jobs.forEach(job => {
            tr = document.createElement('tr')
            tr.classList.add('jobs-data-row')
            Object.keys(job).slice(1).forEach(key => {
                const td = document.createElement('td')
                td.innerHTML = job[key]
                tr.appendChild(td)
            })
            tr.setAttribute('onClick', `window.open("https://${this.#company}.ats.maplehr.io/public/jobs/${job.id}")`)
            table.appendChild(tr)
        })
        document.getElementById('embedATSWidget').appendChild(table)
    }

    static #fetchAndRenderJobs = () => {
      return fetch(`https://${this.#company}.ats.maplehr.io/api/v1/jobs`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
      })
      .then(response => {return response.json()})
	}

    static start = () => {
    	this.#fetchAndRenderJobs().then(response => this.#renderJobs(response.jobs))
    }
}

JobRenderService.start()
