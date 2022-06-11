<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type');

?>

    <div class="wrapper" id="page-wrapper">
        <div id="content" tabindex="-1">

            <!-- ПРОМО -->
            <?php get_template_part('template-parts/content', 'promo'); ?>

            <!-- ОБО МНЕ -->
            <?php get_template_part('template-parts/content', 'about'); ?>

            <!-- СВОБОДНЫЕ ЭСКИЗЫ -->
            <?php get_template_part('template-parts/content', 'sketch'); ?>

            <!-- ПОРТФОЛИО -->
            <?php get_template_part('template-parts/content', 'portfolio'); ?>

            <!-- УСЛУГИ И ЦЕНЫ -->
            <?php get_template_part('template-parts/content', 'price'); ?>

            <!-- ДЛЯ ДУШИ -->
            <?php get_template_part('template-parts/content', 'soul'); ?>

        </div><!-- #content -->
    </div><!-- #page-wrapper -->


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-secondary">
                <div class="modal-header">
                    <h3 class="modal-title display-4" id="exampleModalLabel">Напишите мне )</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <?php echo do_shortcode('[contact-form-7 id="41" title="Контактная форма 1"]'); ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Go to top -->

<?php
get_footer();
