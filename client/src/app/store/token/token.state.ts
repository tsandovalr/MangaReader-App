import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetToken } from './token.action'
import { Token } from './token.model'
 
@State({
    name: "token",
    defaults: {
        token: "vacio"
    }
})
@Injectable({
    providedIn: 'root'
})
export class TokenState{
    
    @Selector()
    static getToken(state: Token) {
        return state.token;
    }

    @Action(SetToken)
    setToken({ patchState }: StateContext<Token>, { payload }: SetToken){
        patchState({
            token: payload
        })
    }
}