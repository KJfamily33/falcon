import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@deity/falcon-i18n';
import { ProductQuery } from '@deity/falcon-shop-data';
import { Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@deity/falcon-ui';
import { Field, rangeValidator, requiredValidator, AddToCartFormProvider } from '@deity/falcon-front-kit';
import {
  ProductLayout,
  ProductLayoutAreas,
  ProductDescription,
  OpenSidebarMutation,
  ProductPrice,
  ProductTierPrices,
  ProductGallery,
  ProductOptionList,
  Form,
  FormFieldError,
  FormErrorSummary,
  PageLayout,
  Breadcrumbs
} from '@deity/falcon-ui-kit';

const ProductPage = ({ id, path }) => (
  <ProductQuery variables={{ id, path }}>
    {({ product }) => (
      <PageLayout>
        <Breadcrumbs items={product.breadcrumbs} />
        <OpenSidebarMutation>
          {openSidebar => (
            <AddToCartFormProvider
              quantity={1}
              product={product}
              onSubmit={() => openSidebar({ variables: { contentType: 'cart' } })}
            >
              {({ isSubmitting, status }) => (
                <ProductLayout as={Form} id="add-to-cart" i18nId="product">
                  <FlexLayout gridArea={ProductLayoutAreas.gallery} alignItems="center" justifyContent="center">
                    <ProductGallery items={product.gallery} />
                  </FlexLayout>
                  <Text fontSize="sm" gridArea={ProductLayoutAreas.sku}>
                    <T id="product.sku" sku={product.sku} />
                  </Text>
                  <H1 gridArea={ProductLayoutAreas.title}>{product.name}</H1>
                  <Box gridArea={ProductLayoutAreas.price}>
                    <ProductPrice {...product.price} fontSize="xl" />
                    <ProductTierPrices items={product.tierPrices} />
                  </Box>
                  <ProductOptionList
                    gridArea={ProductLayoutAreas.options}
                    name="options"
                    items={product.options}
                    disabled={isSubmitting}
                  />
                  <ProductDescription gridArea={ProductLayoutAreas.description} value={product.description} />
                  <FlexLayout alignItems="center" gridArea={ProductLayoutAreas.cta} mt="xs">
                    <Field name="qty" validate={[requiredValidator, rangeValidator(1)]}>
                      {({ field, label, error }) => (
                        <Box mr="md">
                          <NumberInput {...field} min={1} disabled={isSubmitting} aria-label={label} />
                          <FormFieldError>{field.invalid ? error : null}</FormFieldError>
                        </Box>
                      )}
                    </Field>
                    <Button type="submit" height="xl" disabled={isSubmitting} variant={isSubmitting && 'loader'}>
                      {!isSubmitting && <Icon src="cart" stroke="white" size="md" mr="sm" />}
                      <T id="product.addToCart" />
                    </Button>
                  </FlexLayout>
                  <Box gridArea={ProductLayoutAreas.error}>
                    <FormErrorSummary errors={status && status.error} />
                  </Box>
                </ProductLayout>
              )}
            </AddToCartFormProvider>
          )}
        </OpenSidebarMutation>
      </PageLayout>
    )}
  </ProductQuery>
);
ProductPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductPage;
