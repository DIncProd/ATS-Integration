class JobRenderService {
	static #companyDomain = document.currentScript.getAttribute('companyDomain')

    static #renderJobs = (jobs) => {
        let div = document.createElement('div')
        div.classList.add('ats-div')
        let table = document.createElement('table')
        table.classList.add('ats-table')
        let tr = document.createElement('tr')
        tr.classList.add('ats-head')
        let th = document.createElement('th')
        th.innerHTML = 'Title'
        th.classList.add('ats-title')
        tr.appendChild(th)
        th = document.createElement('th')
        th.innerHTML = 'Locations'
        th.classList.add('ats-locations')
        tr.appendChild(th)
        table.appendChild(tr)
        jobs.forEach(job => {
            tr = document.createElement('tr')
            tr.classList.add('ats-data-row')
            let td = document.createElement('td')
            td.innerHTML = job.title
            tr.appendChild(td)
            td = document.createElement('td')
            td.innerHTML = job.locations
            tr.appendChild(td)
            tr.setAttribute('onClick', `window.open("http://${this.#companyDomain}.localhost:3000/public/jobs/${job.id}")`)
            table.appendChild(tr)
        })
        document.getElementById('embed-ats-job').appendChild(table)
    }

    static #fetchAndRenderJobs = () => {
      return fetch(`http://${this.#companyDomain}.localhost:3000/api/v1/jobs`, {
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
