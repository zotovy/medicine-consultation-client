export const checkPassword = (p1: string, p2: string): TCheckPassword => {
    /**
     *  1. must be equal
     *  2. must be at lest 8 symbols length and less than 128
     *  3. must contains at least one letter
     *  4. must contains at least one number
     *  5. must contains only numbers, letters (a-z, A-Z)
     */

    if (p1 !== p2)
        return {
            ok: false,
            error: "Пароли не совпадают",
        };

    const match = p1.match(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,128}$/);

    return match
        ? {
              ok: true,
          }
        : {
              ok: false,
              error:
                  "Пароль должен быть от 8 символов в длину, содержать числа и буквы латинского алфавита",
          };
};

export type TCheckPassword = {
    ok: boolean;
    error?: string;
};
