/* Teacher IA — additive assistant for Teacher Plataforma.
   API key stays server-side in Supabase Edge Function Secrets. */
(function () {
  if (window.__teacherIAWidgetLoaded) return;
  window.__teacherIAWidgetLoaded = true;

  const css = `
  #teacherIAFab{position:fixed;right:22px;bottom:22px;z-index:99990;border:0;border-radius:999px;padding:13px 18px;background:linear-gradient(135deg,#6d4bd1,#8d68ef);color:#fff;font:700 14px system-ui;box-shadow:0 12px 32px #4a2b9a42;cursor:pointer}
  #teacherIAPanel{position:fixed;right:20px;bottom:82px;z-index:99991;width:min(410px,calc(100vw - 28px));height:min(650px,calc(100vh - 120px));display:none;flex-direction:column;background:#fff;color:#242033;border:1px solid #e7e0f4;border-radius:20px;box-shadow:0 22px 70px #20143b35;overflow:hidden;font:14px/1.45 system-ui}
  #teacherIAPanel *{box-sizing:border-box}
  #teacherIAHead{display:flex;align-items:center;justify-content:space-between;padding:15px 16px;background:#f7f3ff;border-bottom:1px solid #eee7fa}
  #teacherIAHead strong{font-size:16px}
  #teacherIAHead small{display:block;color:#756b8d;font-size:11px}
  #teacherIAClose{border:0;background:transparent;font-size:24px;cursor:pointer;color:#5b4b79}
  #teacherIAModes{display:flex;gap:6px;padding:10px;overflow:auto;border-bottom:1px solid #f0ebf7}
  #teacherIAModes button{white-space:nowrap;border:1px solid #e4dcf2;background:#fff;color:#594780;border-radius:999px;padding:7px 10px;font-size:12px;cursor:pointer}
  #teacherIAModes button.active{background:#6d4bd1;color:white;border-color:#6d4bd1}
  #teacherIAFields{padding:12px;display:grid;gap:8px;border-bottom:1px solid #f0ebf7}
  #teacherIAFields input,#teacherIAFields select,#teacherIAPrompt{width:100%;border:1px solid #ded7e9;border-radius:10px;padding:10px;font:13px system-ui;background:#fff;color:#242033}
  #teacherIAPrompt{resize:vertical;min-height:95px;max-height:190px}
  #teacherIAResult{padding:14px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;flex:1;color:#312a40}
  #teacherIAActions{display:flex;gap:8px;padding:12px;border-top:1px solid #f0ebf7}
  #teacherIARun,#teacherIACopy{border:0;border-radius:10px;padding:11px 13px;font-weight:700;cursor:pointer}
  #teacherIARun{flex:1;background:#6d4bd1;color:#fff}
  #teacherIACopy{background:#f1ecfa;color:#5b438d}
  #teacherIAStatus{font-size:11px;color:#796e8d;padding:0 13px 9px}
  @media(max-width:520px){#teacherIAFab{right:12px;bottom:12px}#teacherIAPanel{right:8px;bottom:68px;width:calc(100vw - 16px);height:calc(100vh - 88px)}}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const fab = document.createElement("button");
  fab.id = "teacherIAFab";
  fab.type = "button";
  fab.textContent = "✦ Teacher IA";
  fab.setAttribute("aria-label", "Abrir Teacher IA");
  document.body.appendChild(fab);

  const panel = document.createElement("section");
  panel.id = "teacherIAPanel";
  panel.setAttribute("aria-label", "Assistente Teacher IA");
  panel.innerHTML = `
    <header id="teacherIAHead"><div><strong>✦ Teacher IA</strong><small>Assistente para aulas de inglês · CEFR</small></div><button id="teacherIAClose" type="button" aria-label="Fechar">×</button></header>
    <nav id="teacherIAModes" aria-label="Ferramentas IA">
      <button type="button" data-mode="chat" class="active">Conversar</button>
      <button type="button" data-mode="lesson">Plano de aula</button>
      <button type="button" data-mode="correct">Corrigir texto</button>
      <button type="button" data-mode="evaluate">Avaliar escrita</button>
      <button type="button" data-mode="diagnose">Diagnóstico API</button>
    </nav>
    <div id="teacherIAFields">
      <select id="teacherIALevel" aria-label="Nível CEFR">
        <option>A0</option><option>A1</option><option>A2</option><option selected>B1</option><option>B2</option><option>C1</option><option>C2</option>
      </select>
      <input id="teacherIATopic" placeholder="Tema da aula (para Plano de aula)" style="display:none">
      <textarea id="teacherIAPrompt" placeholder="Ex.: Crie uma atividade de speaking B1 sobre viagens."></textarea>
    </div>
    <div id="teacherIAResult" aria-live="polite">Olá, Teacher! Escolha uma ferramenta e escreva seu pedido. A chave da IA fica protegida no servidor.</div>
    <div id="teacherIAStatus">A IA só é chamada quando você clicar em “Gerar resposta”. O uso pode consumir créditos do provedor.</div>
    <footer id="teacherIAActions"><button id="teacherIARun" type="button">Gerar resposta</button><button id="teacherIACopy" type="button">Copiar</button></footer>
  `;
  document.body.appendChild(panel);

  let mode = "chat";
  const $ = (id) => document.getElementById(id);
  const promptEl = $("teacherIAPrompt");
  const topicEl = $("teacherIATopic");
  const resultEl = $("teacherIAResult");
  const statusEl = $("teacherIAStatus");

  function setMode(next) {
    mode = next;
    panel.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
    topicEl.style.display = mode === "lesson" ? "block" : "none";
    promptEl.placeholder = mode === "lesson"
      ? "Objetivo, gramática ou instruções extras (opcional)…"
      : mode === "correct" || mode === "evaluate"
      ? "Cole aqui o texto do aluno…"
      : mode === "diagnose"
      ? "Clique em Gerar resposta para verificar quais Secrets estão disponíveis. Nenhum valor secreto será exibido."
      : "Ex.: Crie uma atividade de speaking B1 sobre viagens.";
    promptEl.style.display = mode === "diagnose" ? "none" : "block";
    $("teacherIARun").textContent = mode === "lesson" ? "Criar plano" : mode === "correct" ? "Corrigir texto" : mode === "evaluate" ? "Avaliar texto" : mode === "diagnose" ? "Verificar conexão" : "Gerar resposta";
    resultEl.textContent = mode === "lesson" ? "Informe o tema para criar um plano de aula completo." : "Escreva seu pedido e clique em gerar resposta.";
  }

  fab.addEventListener("click", () => {
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });
  $("teacherIAClose").addEventListener("click", () => panel.style.display = "none");
  panel.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));

  $("teacherIARun").addEventListener("click", async () => {
    const prompt = promptEl.value.trim();
    const level = $("teacherIALevel").value;
    const topic = topicEl.value.trim();
    if (mode === "diagnose") { /* No prompt required for safe configuration diagnostics. */ }
    else if (mode === "lesson" && !topic) {
      resultEl.textContent = "Digite o tema da aula no campo acima.";
      topicEl.focus();
      return;
    }
    if (mode !== "lesson" && mode !== "diagnose" && !prompt) {
      resultEl.textContent = mode === "chat" ? "Digite uma pergunta ou tarefa para a Teacher IA." : "Cole o texto que deseja analisar.";
      promptEl.focus();
      return;
    }
    const client = (typeof sb !== "undefined" && sb) || window.sb || window.supabaseClient;
    if (!client || !client.functions || typeof client.functions.invoke !== "function") {
      resultEl.textContent = "Não encontrei a sessão do Supabase nesta página. Entre na plataforma novamente e tente outra vez.";
      return;
    }
    const run = $("teacherIARun");
    run.disabled = true;
    run.textContent = "Processando…";
    resultEl.textContent = "A IA está preparando sua resposta. Aguarde…";
    statusEl.textContent = "Conectando à função segura do Supabase…";
    try {
      const payload = { mode, level, language: "pt", text: prompt, prompt, topic, skill: "Integrated skills", duration: "60 minutes", audience: "Teens and adults" };
      const { data, error } = await client.functions.invoke("fluent-ai", { body: payload });
      if (error) {
        let detail = "";
        try {
          const response = error.context;
          if (response && typeof response.clone === "function") {
            const parsed = await response.clone().json();
            detail = parsed && (parsed.error || parsed.message) ? String(parsed.error || parsed.message) : "";
            if (parsed && parsed.provider_status) detail += " (provedor HTTP " + parsed.provider_status + ")";
          }
        } catch (_) {}
        throw new Error(detail || String(error.message || error));
      }
      if (data && data.error) throw new Error(data.error + (data.provider_status ? " (provedor HTTP " + data.provider_status + ")" : ""));
      resultEl.textContent = data.answer || JSON.stringify(data, null, 2);
      statusEl.textContent = "Concluído · " + (data.provider || "IA") + (data.model ? " · " + data.model : "");
    } catch (e) {
      resultEl.textContent = "Não foi possível concluir. " + String(e && e.message || e);
      statusEl.textContent = "A mensagem acima deve indicar a causa. Não compartilhe sua chave API.";
    } finally {
      run.disabled = false;
      run.textContent = mode === "lesson" ? "Criar plano" : mode === "correct" ? "Corrigir texto" : mode === "evaluate" ? "Avaliar texto" : mode === "diagnose" ? "Verificar conexão" : "Gerar resposta";
    }
  });

  $("teacherIACopy").addEventListener("click", async () => {
    const text = resultEl.innerText || resultEl.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Resposta copiada.";
    } catch (_) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      statusEl.textContent = "Resposta copiada.";
    }
  });
})();