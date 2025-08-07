 const data = {
      share: [
        {
          img: "../msc/assets/thumbnail/kaizen.webp",
          alt: "Kaizen",
          title: "Muốn phát triển liên tục - Phải có Kaizen!",
          desc: "Kaizen là triết lý cải tiến liên tục, giúp doanh nghiệp luôn đổi mới và nâng cao chất lượng.",
          href: "https://www.facebook.com/msc.edu.vn"
        },
        {
          img: "../msc/assets/thumbnail/IKIGAI.webp",
          alt: "Ikigai",
          title: "IKIGAI – Tìm ra lẽ sống của cuộc đời bạn",
          desc: "Khám phá ý nghĩa cuộc sống và cách Ikigai giúp bạn đạt được sự cân bằng trong công việc và đam mê.",
          href: "#"
        },
        {
          img: "../msc/assets/thumbnail/TMC.webp",
          alt: "TMC",
          title: "Trainer - Coach - Mentor khác nhau như thế nào?",
          desc: "Hiểu rõ vai trò và giá trị của từng hình thức hỗ trợ phát triển cá nhân và nghề nghiệp.",
          href: "#"
        },
        {
          img: "../msc/assets/thumbnail/ASK.webp",
          alt: "ASK",
          title: "ASK - Mô hình đánh giá năng lực chuẩn quốc tế",
          desc: "Đo lường năng lực nhân sự hiệu quả với mô hình ASK: Attitude, Skills, Knowledge.",
          href: "#"
        }
      ],
      hotnews: [
        
      ]
    };

    const tabs = document.querySelectorAll(".tab");
    const panes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        panes.forEach(p => p.classList.remove("active"));

        tab.classList.add("active");
        const pane = document.querySelector(`.tab-pane[data-pane="${tab.dataset.tab}"]`);
        pane.classList.add("active");
      });
    });

    function renderNews(paneName) {
      const pane = document.querySelector(`.tab-pane[data-pane="${paneName}"]`);
      pane.innerHTML = `<div class="news-list">${data[paneName].map(item => `
        <a href="${item.href}" class="news-item">
          <img src="${item.img}" alt="${item.alt}" />
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </a>
      `).join('')}</div>`;
    }

    renderNews("share");
    renderNews("hotnews");