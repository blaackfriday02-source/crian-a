// Dados fake só pra você ver o layout funcionando.
// Depois você troca pra puxar do seu catálogo/API.
window.PRODUTO = {
  titulo: "Kit 10 conjuntos roupa infantil feminina Verão",
  categoria: "Kit roupa feminina",
  preco: "R$39,90",
  precoOriginal: "R$ 79,90",
  desconto: "50% OFF",
  parcelas: "em 12x R$ 3,32",
  pix: "10% OFF no Pix",
  prazo: "Chega entre 3 e 7 dias úteis",
  estoque: "20 disponíveis",
	  // Começa no padrão (Cor: Brasil) com 3 fotos
	  imagens: [
    "assets/img1.webp",
    "assets/br1.webp"
  ],
 
 
  descricao: [
    "Em todas as estações queremos deixar as crianças confortáveis, bem vestidas e estilosas para aproveitar cada momento.",
    "Aqui você encontra os melhores conjuntos, com a melhor qualidade e uma entrega rápida e segura.",
    "",
    "Nesse anuncio você pode adquirir 10 conjuntos de verão para menina, contendo 10 blusas + 10 shorts.",
    "Os conjuntos são enviados à sua escolha de modelo, sem repetir estampas e no tamanho selecionado no momento da compra.",
    "Todas as estampas são lindas e exclusivas.",
    "",
    "Todo processo de separação e envio do seu pedido é feito com muito amor e carinho.",
    "",
    "",
    "TEMOS A PRONTA ENTREGA PARA ENVIO IMEDIATO!",
    "",
    "DUVIDAS FREQUENTES:",
    "",
    "- Qual tamanho devo comprar?",
    "R: Recomendamos sempre um tamanho maior ao que a criança costuma usar, não levando em consideração a idade.",
    "Indicamos conferir nossa tabela de medidas disponível nas imagens do anuncio.",
    "",
    "",
    "- Posso variar tamanhos?",
    "R: Neste anuncio não é possível variar, pois os conjuntos já estão prontos e separados para o envio.",
    "",
    "",
    "- Posso escolher estampa?",
    "R: Mediante à sua escolha no anúncio. Sempre temos novidades de estampa e atualizamos em nosso site!",
    "Fique tranquilo que esse processo é feito com muito carinho e atenção.",
    "",
    "Garantia de satisfação",
    "",
    "• Devolução grátis em até 7 dias caso não sirva ou não esteja de acordo.",
    "",
    "• Para trocas e devoluções, o kit deve estar completo, com etiquetas e sem uso, conforme regras do Mercado Livre.",
    "",
    "Garantia do vendedor: 30 dias",
    "",
    "Boas compras!!"
  ]
};

window.addEventListener("load", function () {

  // ⚡ PERFORMANCE: carrega primeiro a imagem principal (img1)
  // e só depois, em "segundo plano", puxa as outras.
  try {
    var imgs = (window.PRODUTO && window.PRODUTO.imagens ? window.PRODUTO.imagens : []).filter(function (x) { return !!x; });
    var principal = imgs[0];
    var restantes = imgs.slice(1);

    if (principal) {
      const im1 = new Image();
      im1.decoding = 'async';
      im1.src = principal;

      var preloadRestantes = function () {
        var run = function () {
          restantes.forEach(function (src) {
            var im = new Image();
            im.decoding = 'async';
            im.loading = 'lazy';
            im.src = src;
          });
        };

        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(run, { timeout: 1500 });
        } else {
          setTimeout(run, 250);
        }
      };

      // quando img1 terminar (ou se já estiver em cache), pré-carrega o resto
      im1.onload = preloadRestantes;
      im1.onerror = preloadRestantes;
      setTimeout(preloadRestantes, 1200);
    }
  } catch (e) {}

  // ✅ Sincroniza dados do produto para o fluxo do checkout/carrinho
  try{
    if(window.PRODUTO){
      set_cookie('produto_nome', window.PRODUTO.titulo || '');
      set_cookie('produto_imagens', JSON.stringify(window.PRODUTO.imagens || []));
      set_cookie('produto_imagem_principal', (window.PRODUTO.imagens && window.PRODUTO.imagens[0]) ? window.PRODUTO.imagens[0] : '');
      set_cookie('produto_preço_atual', window.PRODUTO.preco || '');
      set_cookie('produto_preço_original', window.PRODUTO.precoOriginal || '');

      // ✅ Variações (COR + TAMANHO) no formato que o produto.js entende
      // (isso garante que sempre vai aparecer, mesmo sem backend)
      var variacoes = [
        {
          "variação": "Modelo",
          "valores": [
            { "titulo": "Modelo", "valor": "Modelo 1", "imagem": "assets/img1.webp", "fullid": "" },
            { "titulo": "Modelo", "valor": "Modelo 2", "imagem": "assets/img2.webp", "fullid": "" },
            { "titulo": "Modelo", "valor": "Modelo 3", "imagem": "assets/img3.webp", "fullid": "" },
            { "titulo": "Modelo", "valor": "Modelo 4", "imagem": "assets/img4.webp", "fullid": "" }
          ]
        },
        {
          "variação": "Tamanho",
          "valores": [
            { "titulo": "Tamanho", "valor": "Tam 1", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 2", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 3", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 4", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 5", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 6", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 7", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 8", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 9", "imagem": "", "fullid": "" },
            { "titulo": "Tamanho", "valor": "Tam 10", "imagem": "", "fullid": "" },
          ]
        }
      ];
      set_cookie('produto_variações', JSON.stringify(variacoes));
    }
  }catch(e){}

  // Preenche título/categoria/preço
  const $ = (sel) => document.querySelector(sel);
  $("#titulo-do-produto").textContent = window.PRODUTO.titulo;
  $("#categoria-do-produto").textContent = window.PRODUTO.categoria;
  $("#preço-do-produto").textContent = window.PRODUTO.preco;
  $("#preço-original").textContent = window.PRODUTO.precoOriginal;
  $("#diferença-de-preço").textContent = window.PRODUTO.desconto;
  $("#parcelamento-no-cartão").textContent = window.PRODUTO.parcelas;
  $("#desconto-no-pix").textContent = window.PRODUTO.pix;
  $("#prazo-de-entrega").textContent = window.PRODUTO.prazo;
  $("#quantidade-disponivel").textContent = "(" + window.PRODUTO.estoque + ")";

  // Imagens no carousel
  const container = $("#imagens-do-produto");
  if (container) {
    container.innerHTML = (window.PRODUTO.imagens || []).map(function (src, i) { return `
      <div class="item">
        <img src="${src}"
          ${i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
          decoding="async"
          style="width:100%;display:block;">
      </div>
    `; }).join("");
  }

  // Fotos do produto (abaixo)
  const fotos = document.getElementById("fotos-do-produto");
  if (fotos) {
    // Só 2 fotos nessa seção
    fotos.innerHTML = (window.PRODUTO.imagens || []).slice(0, 2).map(function (src, i) { return `
      <img src="${src}"
        ${i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
        decoding="async"
        style="width:100%;margin:10px 0;border-radius:6px;display:block;">
    `; }).join("");
  }

  // Descrição
  const desc = document.getElementById("descrição-do-produto");
  if (desc) {
    desc.innerHTML = (window.PRODUTO.descricao || []).map(function (l) {
    if (!l) return `<div style="height:10px;"></div>`;
    return `<p style="margin:6px 0;line-height:1.35;color:rgba(0,0,0,.45);">${l}</p>`;
  }).join("");
  }

  // Inicializa owl carousel se existir
  if (window.jQuery && jQuery.fn && jQuery.fn.owlCarousel) {
    jQuery("#imagens-do-produto").owlCarousel({
      items: 1,
      loop: false,
      dots: true
    });

    const total = window.PRODUTO.imagens.length;
    document.getElementById("slider-count-total").textContent = total;
    document.getElementById("slider-count-atual").textContent = 1;

    jQuery("#imagens-do-produto").on("changed.owl.carousel", function (event) {
      const index = event.item.index + 1;
      document.getElementById("slider-count-atual").textContent = index;
    });
  }

  // ✅ Renderiza variações (Cor/Tamanho) usando o produto.js
  try{
    if(typeof carregar_variações === 'function') carregar_variações();
  }catch(e){}
});

// patch v2
try{
  var elQA = document.getElementById('quantidade-de-avaliações');
  if(elQA) elQA.append(' (1.234 avaliações)');
}catch(e){}

(function () {
  const box = document.getElementById("avaliação_por_caracteristicas");
  if (!box) return;

  // Qualidades + estrelas (igual o print)
  const itens = [
    { nome: "Custo-benefício", estrelas: 5 },
    { nome: "Confortável", estrelas: 5 },
    { nome: "Qualidade do tecido", estrelas: 5 },
    { nome: "Não desbotou na lavagem", estrelas: 5 },
    { nome: "Não encolhe na lavagem", estrelas: 5 },
  ];

  var corCheiaEl = document.getElementById("corForte");
  var corCheia = (corCheiaEl && corCheiaEl.textContent ? String(corCheiaEl.textContent).trim() : "") || "rgb(52, 131, 250)";
  const corVazia = "rgba(0,0,0,.25)";

  function estrelasHTML(qtd) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span style="font-size:14px; margin-left:2px; color:${i <= qtd ? corCheia : corVazia};">★</span>`;
    }
    return html;
  }

  box.innerHTML = `
    <div style="margin-top:10px; display:flex; flex-flow:column; gap:10px;">
      ${itens
        .map(
          (it) => `
        <div style="display:flex; align-items:center;">
          <div style="flex:1; font-family:proximanovaregular; font-size:14px; color:rgba(0,0,0,.9);">
            ${it.nome}
          </div>
          <div style="min-width:110px; text-align:right; line-height:1;">
            ${estrelasHTML(it.estrelas)}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
})();



// ✅ Comentários (avaliações) abaixo das qualidades

(function(){
  const list = document.getElementById("avaliações-do-produto");
  if(!list) return;

  const reviews = [
    {
      stars: 5,
      text: "Perfeitos. Obs: minha menina tem 2 anos e tres meses,comprei o tamanho 3,se sua filha tiver mais idade compre um tanho maior.",
      days: "02 jan. 2026",
      imgs: ["assets/coment1.webp", "assets/coment2.webp"],
      likes: 2
    },
    {
      stars: 5,
      text: "Produto muito bom. Minha bebê tem 2 anos e 3 meses,pesa 13kg,tem 87cm de altura.",
      days: "23 out. 2025",
      imgs: ["assets/coment3.webp"],
      likes: 15
    },
    {
      stars: 5,
      text: "Gente as roupinhas são muito lindinhas, ótimo material e realmente vem tudo bem cheirosas. A minha filhota amou.",
      days: "03 set. 2024",
      imgs: ["assets/coment4.webp", "assets/coment5.webp"],
      likes: 9
    }
  ];

  var blueEl = document.getElementById("corForte");
  var blue = (blueEl && blueEl.textContent ? String(blueEl.textContent).trim() : "") || "rgb(52, 131, 250)";
  const gray = "rgba(0,0,0,.25)";

  const starsRow = (n)=> {
    let s="";
    for(let i=1;i<=5;i++){
      s += `<span style="font-size:14px;margin-right:2px;color:${i<=n?blue:gray};">★</span>`;
    }
    return s;
  };

  const itemHTML = (r, idx) => {
    const key = "like_review_"+idx;
    const liked = localStorage.getItem(key)==="1";
    const count = r.likes + (liked ? 1 : 0);

    const imgs = Array.isArray(r.imgs) ? r.imgs : (r.img ? [r.img] : []);
    const gal = imgs
      .slice(0, 3)
      .map((src) => `
        <div style="width:82px;height:82px;border-radius:12px;overflow:hidden;background:#f2f2f2;flex:0 0 82px;">
          <img src="${src}" alt="" style="width:100%;height:100%;display:block;" />
        </div>
      `)
      .join("");

    // Já existe um divisor antes da lista de comentários.
    // Então o 1º item NÃO deve ter border-top (senão fica com “linha dupla”).
    const topBorder = (idx === 0) ? "none" : "1px solid rgba(0,0,0,.1)";

    return `
      <div class="ml-review-item" style="padding:18px 0;border-top:${topBorder};">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="line-height:1;">${starsRow(r.stars)}</div>
          <div style="font-family:proximanovaregular;font-size:12px;color:rgba(0,0,0,.55);">${r.days}</div>
        </div>

        ${gal ? `<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;">${gal}</div>` : ``}

        ${r.text ? `<div style="margin-top:12px;font-family:proximanovaregular;font-size:15px;line-height:1.35;color:rgba(0,0,0,.9);">${r.text}</div>` : ``}

        <div style="margin-top:14px;display:flex;gap:12px;align-items:center;">
          <button type="button" class="ml-like-btn" data-idx="${idx}" style="-webkit-appearance:none;appearance:none;display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid #c7c7c7;border-radius:26px;background:#fff;cursor:pointer;">
            <span style="font-family:proximanovaregular;font-size:13px;color:rgba(59, 59, 59, 0.9);">É útil</span>
            <i class="material-icons ml-like-ico" style="font-size:18px;line-height:18px;color:${liked?blue:'rgba(0,0,0,.55)'};">thumb_up</i>
            <span class="ml-like-count" style="font-family:proximanovaregular;font-size:16px;color:rgba(0,0,0,.9);">${count}</span>
          </button>

          <button type="button" class="ml-dislike-btn" data-idx="${idx}" style="-webkit-appearance:none;appearance:none;width:44px;height:44px;border:1px solid #c7c7c7;border-radius:50%;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;">
            <i class="material-icons ml-dislike-ico" style="font-size:13px;line-height:20px;color:rgba(59, 59, 59, 0.9);">thumb_down</i>
          </button>
        </div>
      </div>
    `;
  };

  // render
  list.innerHTML = reviews.map(itemHTML).join("") + `<div style="border-top:1px solid rgba(0,0,0,.1);"></div>`;

  // clicks
  list.querySelectorAll(".ml-like-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const idx = btn.getAttribute("data-idx");
      const key = "like_review_"+idx;
      const liked = localStorage.getItem(key)==="1";
      const ico = btn.querySelector(".ml-like-ico");
      const countEl = btn.querySelector(".ml-like-count");
      var base = (reviews[Number(idx)] && reviews[Number(idx)].likes) ? reviews[Number(idx)].likes : 0;

      if(liked){
        localStorage.removeItem(key);
        ico.style.color = "rgba(0,0,0,.55)";
        countEl.textContent = String(base);
      }else{
        localStorage.setItem(key,"1");
        ico.style.color = blue;
        countEl.textContent = String(base+1);
      }
    });
  });

  // dislike (só toggle visual, igual print)
  list.querySelectorAll('.ml-dislike-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ico = btn.querySelector('.ml-dislike-ico');
      const on = btn.getAttribute('data-on') === '1';
      if (on) {
        btn.setAttribute('data-on', '0');
        ico.style.color = 'rgba(0,0,0,.55)';
      } else {
        btn.setAttribute('data-on', '1');
        ico.style.color = blue;
      }
    });
  });
})();


/* =========================
   CARACTERÍSTICAS DO PRODUTO (placeholder)
   - Renderiza um layout no estilo do print (tabela com seções)
   - Você pode editar os dados aqui depois, sem mexer no HTML
========================= */
(function () {
  const host = document.getElementById("caracteristicas-1-conteudo");
  if (!host) return;

  const SECOES = [
    {
      titulo: "Características principais",
      linhas: [
        ["Marca", "Boneca de pano"],
        ["Linha", "KIDS"],
        ["Modelo", "Kit roupinha de verão femininas infantis."],
        ["Condição de venda", "10 conjuntos."],
      ],
    },
    {
      titulo: "Informações do produto",
      linhas: [
        ["Quantidade de artigos", "10 conjuntos"],
        ["Idade", "Crianças / Infantil"],
        ["Inclui short", "Sim"],
        ["Inclui blusa", "Sim"],
          
      ],
    },
    
  ];

  function renderTabela(linhas) {
    const rows = linhas.map((par, idx) => {
      const bg = (idx % 2 === 0) ? "rgba(0,0,0,.04)" : "#fff";
      return `
        <div style="display:flex;gap:16px;align-items:center;padding:14px 16px;background:${bg};">
          <div style="flex:1;font-family:proximanovaregular;font-size:14px;color:rgba(0,0,0,.9);">${par[0]}</div>
          <div style="flex:1;text-align:left;font-family:proximanovaregular;font-size:14px;color:rgba(0,0,0,.9);">${par[1]}</div>
        </div>
      `;
    }).join("");

    return `
      <div style="border:1px solid rgba(0,0,0,.08);border-radius:8px;overflow:hidden;background:#fff;">
        ${rows}
      </div>
    `;
  }

  host.innerHTML = SECOES.map(sec => `
    <div style="margin-top:16px;">
      <div style="margin:0 0 10px 0;font-family:proximanovasemibold;font-size:14px;color:rgba(0,0,0,.9);">
        ${sec.titulo}
      </div>
      ${renderTabela(sec.linhas)}
    </div>
  `).join("");
})();

