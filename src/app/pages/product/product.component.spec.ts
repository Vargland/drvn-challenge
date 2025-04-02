import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import ProductComponent from './product.component'
import { ProductServices } from '@services'
import { of } from 'rxjs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

describe('ProductComponent', () => {
    let component: ProductComponent
    let fixture: ComponentFixture<ProductComponent>
    let activatedRouteMock: any
    let spyService: jasmine.SpyObj<ProductServices>

    beforeEach(async () => {
        spyService = jasmine.createSpyObj('ProductServices', ['getProduct'])
        activatedRouteMock = {
            queryParams: of({ id: '123' }),
        }

        await TestBed.configureTestingModule({
            imports: [ProductComponent, CommonModule, FormsModule],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: ProductServices, useValue: spyService },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents()

        fixture = TestBed.createComponent(ProductComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        spyService.getProduct.and.returnValue(of([] as any))
        expect(component).toBeTruthy()
    })
})