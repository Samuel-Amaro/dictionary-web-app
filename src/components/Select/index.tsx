import React, { useState, useRef, useEffect} from "react";
import ArrowDown from "../Icons/ArrowDown";

type PropsSelect = {
  optionsSelect: string[];
};

type OptionData = {
  option: string;
  id: number;
};

export default function Select({
  optionsSelect,
}: PropsSelect) {
  const refCombo = useRef<HTMLDivElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const [optionSelected, setOptionSelected] = useState<OptionData>({
    option: optionsSelect[0],
    id: 0,
  });

  const selectActionsKey = {
    close: 0,
    closeSelect: 1,
    first: 2,
    last: 3,
    next: 4,
    open: 5,
    pageDown: 6,
    pageUp: 7,
    previous: 8,
    select: 9,
    type: 10,
  };

  // filtra um array de opções contra uma string de entrada
  // retorna um array de opções que começam com a string do filtro, independente de maiúsculas e minúsculas
  function filterOptions(filter: string) {
    return optionsSelect.filter((option) => {
      return option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    });
  }

  //verifica se o elemento está visível na porta de exibição do navegador
  function isElementInView(element: Element) {
    let bouding = element.getBoundingClientRect();
    return (
      bouding.top >= 0 &&
      bouding.left >= 0 &&
      bouding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bouding.right <=
        (window.innerHeight || document.documentElement.clientWidth)
    );
  }

  // verifica se um elemento é atualmente rolável
  function isScrollable(element: Element) {
    return element && element.clientHeight < element.scrollHeight;
  }

  ///garante que um determinado elemento filho esteja dentro da área de rolagem visível do pai
  // se o filho não estiver visível, role o pai
  function maintainScrollVisibility(
    activeElement: HTMLElement,
    scrollParent: HTMLElement
  ) {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
      scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
      scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
  }

  // retorna o índice de uma opção de uma matriz de opções, com base em uma string de pesquisa
  // se o filtro for várias iterações da mesma letra (por exemplo, "aaa"), então percorra as correspondências da primeira letra
  function getIndexByLetter(filter: string) {
    const firstMatch = filterOptions(filter)[0];
    return optionsSelect.indexOf(firstMatch);
  }

  function getByIndexOption() {
    return optionsSelect
      .map((option) => {
        return option.toLowerCase();
      })
      .indexOf(optionSelected.option.toLowerCase());
  }

  // mapeia um pressionamento de tecla para uma ação
  function getActionFromKey(
    event: React.KeyboardEvent<HTMLDivElement>
  ): number {
    const { key, altKey, ctrlKey, metaKey } = event;
    // todas as teclas que farão a ação padrão de abertura
    const openKeys = ["ArrowDown", "ArrowUp", "Enter", " ", "Home", "End"];

    // manipula a abertura quando fechado
    if (!isSelectOpen && openKeys.includes(key)) {
      switch (key) {
        case "ArrowUp":
        case "Home":
          return selectActionsKey.first;
        case "ArrowDown":
        case "End":
          return selectActionsKey.last;
        case "Enter":
        case " ":
          return selectActionsKey.open;
        default:
          return selectActionsKey.open;
      }
      //return selectActionsKey.open;
    }

    //lidar com as chaves quando aberto
    if (isSelectOpen) {
      if (key === "ArrowUp" && altKey) {
        return selectActionsKey.closeSelect;
      } else if (key === "ArrowDown" && !altKey) {
        return selectActionsKey.next;
      } else if (key === "ArrowUp") {
        return selectActionsKey.previous;
      } else if (key === "PageUp") {
        return selectActionsKey.pageUp;
      } else if (key === "PageDown") {
        return selectActionsKey.pageDown;
      } else if (key === "Escape") {
        return selectActionsKey.close;
      } else if (key === "Enter" || key === " ") {
        return selectActionsKey.closeSelect;
      } else if (key === "Home") {
        return selectActionsKey.first;
      } else if (key === "End") {
        return selectActionsKey.last;
      }
    }

    // lida com a digitação de caracteres quando aberto ou fechado
    if (
      key === "Backspace" ||
      key === "Clear" ||
      (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
    ) {
      return selectActionsKey.type;
    }

    return selectActionsKey.type;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const action = getActionFromKey(event);
    event.preventDefault();

    switch (action) {
      case selectActionsKey.open:
        setIsSelectOpen(true);
        break;
      case selectActionsKey.first:
        setIsSelectOpen(true);
        setOptionSelected({ option: optionsSelect[0], id: 0 });
        break;
      case selectActionsKey.last:
        setIsSelectOpen(true);
        setOptionSelected({
          option: optionsSelect[optionsSelect.length - 1],
          id: optionsSelect.length - 1,
        });
        break;
      case selectActionsKey.type:
        setIsSelectOpen(true);
        const searchIndex = getIndexByLetter(event.key);

        if (searchIndex >= 0) {
          setOptionSelected({
            option: optionsSelect[searchIndex],
            id: searchIndex,
          });
        }

        break;

      case selectActionsKey.closeSelect:
      case selectActionsKey.close:
        setIsSelectOpen(false);
        break;
      case selectActionsKey.next:
        if (getByIndexOption() < optionsSelect.length - 1) {
          setOptionSelected({
            option: optionsSelect[getByIndexOption() + 1],
            id: getByIndexOption() + 1,
          });
        }
        break;
      case selectActionsKey.previous:
        if (getByIndexOption() > 0) {
          setOptionSelected({
            option: optionsSelect[getByIndexOption() - 1],
            id: getByIndexOption() - 1,
          });
        }

        if (getByIndexOption() === -1) {
          setOptionSelected({
            option: optionsSelect[optionsSelect.length - 1],
            id: optionsSelect.length - 1,
          });
        }
        break;
      default:
        break;
    }

    if (document.querySelector(".select__option--selected")) {
      if (isScrollable(document.querySelector(`[role="listbox"]`) as Element)) {
        //certifique-se de que a nova opção está à vista
        maintainScrollVisibility(
          document.querySelector(".select__option--selected") as HTMLElement,
          document.querySelector(`[role="listbox"]`) as HTMLElement
        );
      }

      // garante que a nova opção esteja visível na tela
      // garante que a nova opção está em vista
      if (
        !isElementInView(
          document.querySelector(".select__option--selected") as Element
        )
      ) {
        const e = document.querySelector(
          ".select__option--selected"
        ) as HTMLElement;
        e.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.dataset.font = optionSelected.option.toLowerCase().split(" ").join("-");
  }, [optionSelected]);

  return (
    <>
      <div className={isSelectOpen ? "select select--open" : "select"}>
        <div
          className="select__input"
          id="combo1"
          aria-expanded={isSelectOpen}
          tabIndex={0}
          aria-controls="listbox1"
          role="combobox"
          aria-haspopup="listbox"
          aria-label="Filter By Region"
          title="Choose select font"
          aria-activedescendant={
            isSelectOpen ? `combo1-${optionSelected.id}` : ""
          }
          onPointerDown={() => {
            setIsSelectOpen(!isSelectOpen);
          }}
          onKeyDown={(event) => {
            handleKeyDown(event);
          }}
          onBlur={() => {
            if (ignoreBlur) {
              setIgnoreBlur(false);
              return;
            }

            if (isSelectOpen) {
              setIsSelectOpen(false);
            }
          }}
          ref={refCombo}
        >
          {optionSelected.option}{" "}
          <ArrowDown className="select__icon" />
        </div>
        <div
          className="select__menu"
          role="listbox"
          id="listbox1"
          aria-labelledby="label-select"
          tabIndex={-1}
        >
          {optionsSelect.map((o, index) => {
            return (
              <div
                key={index}
                role="option"
                id={`combo1-${index}`}
                className={
                  o.toLowerCase() === optionSelected.option.toLowerCase()
                    ? "select__option select__option--selected"
                    : "select__option"
                }
                aria-selected={
                  o.toLowerCase() === optionSelected.option.toLowerCase()
                    ? "true"
                    : "false"
                }
                onPointerDown={() => {
                  setOptionSelected({
                    option: optionsSelect[index] /*event.target.dataset.value*/,
                    id: index,
                  });
                  if (refCombo.current) {
                    refCombo.current.focus();
                  }
                  setIsSelectOpen(false);
                }}
                onMouseDown={() => {
                  // Clicar em uma opção causará um evento de desfoque,
                  // mas não queremos executar a ação padrão de desfoque do teclado
                  setIgnoreBlur(true);
                }}
                data-value={index}
              >
                {o}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
