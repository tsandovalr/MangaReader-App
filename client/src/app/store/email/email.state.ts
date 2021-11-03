import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetEmail  } from './email.action';
import { UserEmail } from './email.model';

@State({
    name: "email",
    defaults: {
        email: 'vacio'
    }
})
@Injectable({
    providedIn: 'root'
})
export class StateEmail{
    @Selector()
    static getEmail(state: UserEmail){
        return state.email;
    }

    @Action(SetEmail)
    setUser({ patchState}: StateContext<UserEmail>, { payload }: SetEmail){
        patchState({
            email: payload
        })
    }

}