import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { of } from 'rxjs'
import { CommonModule } from '@angular/common'
import { provideHttpClient } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { provideHttpClientTesting } from '@angular/common/http/testing'

import { ProductsServices, CategoryServices } from '@services'
import { PaginatorComponent, SearchInputComponent, SidebarComponent } from '@components'
import { ProductCardComponent } from '@containers'
import HomeComponent from './home.component'
import { mockProductsResponse } from '@mocks/products'

const mockCategories = ['electronics', 'clothing', 'jewelery']

describe('HomeComponent', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>
    let mockCategoryService: jasmine.SpyObj<CategoryServices>
    let mockProductsService: jasmine.SpyObj<ProductsServices>

    mockProductsService = jasmine.createSpyObj('mockProductsService', ['getByFilter', 'getByCategory'])
    mockCategoryService = jasmine.createSpyObj('CategoryServices', ['getCategoryList'])

    beforeEach(async () => {
        mockProductsService.getByFilter.and.returnValue(of(mockProductsResponse))
        mockProductsService.getByCategory.and.returnValue(of(mockProductsResponse))
        mockCategoryService.getCategoryList.and.returnValue(of(mockCategories))

        mockCategoryService.categoryList$ = of(mockCategories)
        mockProductsService.products$ = of(mockProductsResponse)

        await TestBed.configureTestingModule({
            imports: [
                HomeComponent,
                CommonModule,
                PaginatorComponent,
                SearchInputComponent,
                ProductCardComponent,
                SidebarComponent,
            ],
            providers: [
                { provide: ProductsServices, useValue: mockProductsService },
                { provide: CategoryServices, useValue: mockCategoryService },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent)
                component = fixture.componentInstance
                fixture.detectChanges()
            })

    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialize with default values', () => {
        expect(component.currentPage).toBe(0)
        expect(component.limit).toBe(10)
        expect(component.totalItems).toBe(0)
    })

    it('should set categories$ and products$ observables', fakeAsync(() => {
        component.ngOnInit()
        tick()

        mockCategoryService.categoryList$.subscribe(categories => {
            expect(categories).toEqual(mockCategories)
        })

        mockProductsService.products$.subscribe(products => {
            expect(products).toEqual(mockProductsResponse)
        })
    }))

    it('should update filters when onChangePage is called', () => {
        const newPage = 2
        component.onChangePage(newPage)

        expect(component.currentPage).toBe(newPage)
        expect(component.filters.skip).toBe(`${newPage * component.limit}`)
    })

    it('should update filters and call getProductBy when onChangePageSize is called', () => {
        const newSize = 20
        component.onChangePageSize(newSize)

        expect(component.filters.limit).toBe(newSize.toString())
        expect(component.filters.skip).toBe('0')
        expect(component.currentPage).toBe(0)
    })
})
